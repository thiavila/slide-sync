// Guards against shipping a bundle that can't reach PartyKit (e.g. built without
// NEXT_PUBLIC_PARTYKIT_HOST, so it falls back to localhost:1999).
//
// Usage:
//   node scripts/verify-deploy.mjs                      # check the local ./out build (runs as postbuild)
//   node scripts/verify-deploy.mjs https://xxxx.slide-sync.pages.dev   # check a deployment + live room smoke test
//
// Requires Node >= 22 (global fetch + WebSocket).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(__dirname, "..");
// Our fallback in src/lib/config.ts is "localhost:1999". (Not 127.0.0.1: partysocket ships
// that string inside a help message, so it is always present and harmless.)
const LOCAL_HOST_RE = /\blocalhost:\d+/g;
const PAGES = ["/session/", "/present/", "/join/"];

// Same precedence as `next build`: real env > .env.production.local > .env.local > .env.production.
function expectedHost() {
  const fromEnv = process.env.NEXT_PUBLIC_PARTYKIT_HOST?.trim();
  if (fromEnv) return fromEnv;
  for (const name of [".env.production.local", ".env.local", ".env.production"]) {
    const file = path.join(APP, name);
    if (!fs.existsSync(file)) continue;
    const m = fs.readFileSync(file, "utf8").match(/^NEXT_PUBLIC_PARTYKIT_HOST=(.+)$/m);
    if (m) return m[1].trim();
  }
  throw new Error("NEXT_PUBLIC_PARTYKIT_HOST not found in env or .env.production");
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function checkSources(label, sources, host) {
  const joined = sources.join("\n");
  const local = [...new Set(joined.match(LOCAL_HOST_RE) || [])];
  if (local.length) fail(`${label}: bundle points at ${local.join(", ")} — viewers won't be able to join rooms`);
  if (!joined.includes(host)) fail(`${label}: bundle doesn't reference the PartyKit host ${host}`);
  console.log(`✓ ${label}: bundle uses ${host} (${sources.length} files scanned)`);
}

function localSources() {
  const dir = path.join(APP, "out", "_next", "static", "chunks");
  if (!fs.existsSync(dir)) fail(`no build found at ${dir}`);
  const files = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (p.endsWith(".js")) files.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(dir);
  return files;
}

async function remoteSources(base) {
  const chunks = new Set();
  for (const page of PAGES) {
    const res = await fetch(new URL(page, base), { cache: "no-store" });
    if (!res.ok) fail(`${page} returned HTTP ${res.status}`);
    const html = await res.text();
    for (const m of html.match(/\/_next\/static\/chunks\/[^"'\s]+\.js/g) || []) chunks.add(m);
  }
  if (!chunks.size) fail(`no JS chunks found on ${base}`);
  return Promise.all(
    [...chunks].map(async (c) => {
      const res = await fetch(new URL(c, base));
      if (!res.ok) fail(`${c} returned HTTP ${res.status}`);
      return res.text();
    })
  );
}

// Mirrors a real session: an observer is already in the room, the presenter publishes a
// slide, and once the server has broadcast it, a late joiner (the "phone") must get it in
// its init snapshot. Waiting on the broadcast avoids racing the server with a fixed sleep.
function roomSmokeTest(host) {
  const room = `VERIFY${Date.now().toString(36).toUpperCase()}`;
  const url = `wss://${host}/parties/main/${room}`;
  const sockets = [];
  const open = (role, onMessage) => {
    const ws = new WebSocket(url);
    sockets.push(ws);
    ws.onerror = () => done(new Error(`${role} could not connect to ${url}`));
    ws.onmessage = (e) => onMessage(JSON.parse(String(e.data)), ws);
    return ws;
  };
  let done;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => done(new Error(`timed out talking to ${url}`)), 10000);
    done = (err) => {
      clearTimeout(timer);
      sockets.forEach((ws) => ws.close());
      err ? reject(err) : resolve(room);
    };
    open("observer", (msg) => {
      if (msg.type === "init") {
        const presenter = open("presenter", () => {});
        presenter.onopen = () =>
          presenter.send(JSON.stringify({ type: "slide-update", slideNumber: 2, imageData: "verify" }));
      } else if (msg.type === "slide-update" && msg.slideNumber === 2) {
        open("viewer", (init) => {
          if (init.type === "init" && init.slides?.["2"] === "verify") done();
          else done(new Error(`viewer joined but got unexpected state: ${JSON.stringify(init).slice(0, 120)}`));
        });
      }
    });
  });
}

const target = process.argv[2];
const host = expectedHost();

if (!target) {
  checkSources("local out/", localSources(), host);
} else {
  checkSources(target, await remoteSources(target), host);
  try {
    const room = await roomSmokeTest(host);
    console.log(`✓ room smoke test: presenter → viewer sync works on ${host} (room ${room})`);
  } catch (err) {
    fail(`room smoke test: ${err.message}`);
  }
  // Keep-alive sockets from fetch/WebSocket would otherwise hold the process open.
  process.exit(0);
}
