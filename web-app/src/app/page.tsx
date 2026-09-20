"use client";
import Link from "next/link";
import Brand from "@/components/brand";
import { useTranslations } from "@/lib/i18n/use-translations";
const STORE =
  "https://chromewebstore.google.com/detail/slidesync/onekdjipbccldnkdpnnjeobeeajbkkad";
export default function Home() {
  const { t } = useTranslations();
  return (
    <main className="brand-page">
      <header className="site-nav">
        <Brand />
        <nav>
          <a href="#how">{t("home.navHow")}</a>
          <Link className="ds-button secondary compact" href="/join">
            {t("home.joinButton")} <span aria-hidden>→</span>
          </Link>
        </nav>
      </header>
      <section className="hero">
        <span className="ds-tag">{t("home.eyebrow")}</span>
        <h1>
          {t("home.headline")}
          <br />
          <span>{t("home.headlineAccent")}</span>
        </h1>
        <p>{t("home.heroBody")}</p>
        <div className="hero-actions">
          <Link className="ds-button" href="/join">
            {t("home.joinButton")} <span aria-hidden>→</span>
          </Link>
          <a
            className="ds-button secondary"
            href={STORE}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("home.installExtension")}
          </a>
          <a className="ds-button secondary" href="/present/">
            {t("home.upload")} <span aria-hidden>↑</span>
          </a>
        </div>
        <p className="formats">{t("home.formats")}</p>
        <p className="hero-note">✓ {t("home.openSource")}</p>
        <div className="showcase" aria-hidden="true">
          <div className="demo-browser">
            <div className="demo-bar">
              <span>● ● ●</span>
              <span>slidesync.live</span>
            </div>
            <div className="demo-top">
              <img src="/brand/logo-e01e8a6ca574.png" alt="" />
              <span className="live-pill">● {t("session.live")}</span>
            </div>
            <div className="demo-slide">
              <small>SLIDESYNC / 2026</small>
              <h2>
                {t("home.headline")}
                <br />
                {t("home.headlineAccent")}
              </h2>
              <div className="demo-geometry">
                <i />
                <i />
                <i />
              </div>
              <span className="demo-slide-footer">
                {t("home.eyebrow")} <b>04</b>
              </span>
            </div>
            <div className="demo-bottom">
              <span>04 / 12</span>
              <span>✎ &nbsp; {t("home.featureAnnotations")}</span>
            </div>
          </div>
          <div className="demo-phone">
            <div className="demo-phone-top">
              slidesync <span>●</span>
            </div>
            <div className="demo-slide">
              <h2>{t("home.headline")}</h2>
              <div className="demo-geometry">
                <i />
                <i />
                <i />
              </div>
            </div>
            <p>{t("home.featureAnnotations")}</p>
            <div className="demo-tools">✎ &nbsp; T &nbsp; ↶ &nbsp; ●</div>
          </div>
        </div>
      </section>
      <section id="how" className="how">
        <span className="eyebrow">{t("home.eyebrow")}</span>
        <h2>{t("home.howItWorks")}</h2>
        <div className="steps">
          {[1, 2, 3].map((n) => (
            <article key={n}>
              <span className="step-number">0{n}</span>
              <h3>{t(`home.step${n}Title`)}</h3>
              <p>{t(`home.step${n}Desc`)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="feature-grid">
        {["Sync", "Annotations", "Export", "NoLogin"].map((x, i) => (
          <article key={x}>
            <span className="feature-icon" aria-hidden>
              {["↗", "✎", "↓", "✓"][i]}
            </span>
            <h3>{t(`home.feature${x}`)}</h3>
            <p>{t(`home.feature${x}Desc`)}</p>
          </article>
        ))}
      </section>
      <footer className="site-footer">
        <span>{t("home.openSource")}</span>
        <nav>
          <Link href="/privacy">{t("home.privacyPolicy")}</Link>
          <a href="https://github.com/thiavila/slidesync">GitHub ↗</a>
          <a href="https://github.com/sponsors/thiavila">
            ♡ {t("home.sponsorCta")}
          </a>
        </nav>
        <p>{t("home.sponsorMessage")}</p>
        <p>
          {t("home.createdBy")}{" "}
          Thiago Avila · <a href="https://avila.ventures">Avila Ventures</a>
        </p>
      </footer>
    </main>
  );
}
