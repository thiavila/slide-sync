"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoomCodeInput from "@/components/room-code-input";
import Link from "next/link";
import Brand from "@/components/brand";
import { useTranslations } from "@/lib/i18n/use-translations";

export default function JoinPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(code: string) {
    setLoading(true);
    setError(null);
    router.push(`/session/${code}`);
  }

  return (
    <main className="brand-page join-page">
      <header className="site-nav">
        <Brand />
        <Link className="back-link" href="/">
          ← {t("session.backHome")}
        </Link>
      </header>
      <div className="join-layout">
        <section className="join-story">
          <span className="eyebrow">{t("home.eyebrow")}</span>
          <h1>{t("join.headline")}</h1>
          <p>{t("join.body")}</p>
        </section>
        <section className="join-card">
          <span className="ds-tag">{t("home.featureNoLogin")}</span>
          <h2>{t("join.title")}</h2>
          <p>{t("join.subtitle")}</p>
          <RoomCodeInput
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </main>
  );
}
