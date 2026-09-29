import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

// NEXT_PUBLIC_PARTYKIT_HOST is inlined into the static bundle at build time. If it is
// missing, config.ts falls back to localhost:1999 and the deployed site silently can't
// join any room (happened on 2026-09-21: a build from a worktree without .env.local).
function assertPartyHost() {
  const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST?.trim();
  if (!host || /^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|$)/.test(host)) {
    throw new Error(
      `[slidesync] Refusing production build: NEXT_PUBLIC_PARTYKIT_HOST is "${host ?? ""}". ` +
        "Expected the public PartyKit host (see web-app/.env.production). " +
        "Check that .env.local is not overriding it with a local value."
    );
  }
}

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) assertPartyHost();
  return nextConfig;
}
