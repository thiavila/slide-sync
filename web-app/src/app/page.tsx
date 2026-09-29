"use client";
import Link from "next/link";
import { useState } from "react";
import Brand from "@/components/brand";
import { useTranslations } from "@/lib/i18n/use-translations";
const STORE =
  "https://chromewebstore.google.com/detail/slidesync/onekdjipbccldnkdpnnjeobeeajbkkad";
export default function Home() {
  const { t } = useTranslations();
  const [playing, setPlaying] = useState(false);
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
        <section className="home-film" aria-label={t("home.videoTitle")}>
          <div className="home-film-label"><span>{t("home.videoTitle")}</span></div>
          <div className="home-film-screen">
            {playing ? (
              <iframe src="https://www.youtube-nocookie.com/embed/U_ktfSlkMhU?autoplay=1&rel=0" title={t("home.videoTitle")} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            ) : (
              <>
                <img src="/brand/video-poster-v1.jpg" alt={t("home.videoAlt")} width="1280" height="720" />
                <button type="button" onClick={() => setPlaying(true)} aria-label={t("home.videoPlay")}>
                  <span className="home-film-play" aria-hidden="true">▶</span>
                  <span>{t("home.videoPlay")}</span>
                </button>
              </>
            )}
          </div>
          <p className="home-film-caption">{t("home.videoCaption")}</p>
        </section>
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
