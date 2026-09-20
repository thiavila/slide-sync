"use client";
import { useState } from "react";
import { useTranslations } from "@/lib/i18n/use-translations";
interface Props {
  onSubmit: (code: string) => void;
  loading?: boolean;
  error?: string | null;
}
export default function RoomCodeInput({ onSubmit, loading, error }: Props) {
  const { t } = useTranslations();
  const [code, setCode] = useState("");
  return (
    <form
      className="code-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (/^\d{6}$/.test(code) && !loading) onSubmit(code);
      }}
    >
      <label htmlFor="room-code">{t("join.codeLabel")}</label>
      <input
        id="room-code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]{6}"
        maxLength={6}
        required
        placeholder="000000"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        disabled={loading}
        aria-describedby={error ? "join-error" : undefined}
      />
      <button className="ds-button" disabled={loading} type="submit">
        {loading ? t("join.entering") : t("join.submit")}{" "}
        <span aria-hidden>→</span>
      </button>
      {error && (
        <p id="join-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
