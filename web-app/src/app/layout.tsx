import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "slidesync",
  icons: { icon: "/brand/icon-2b5e6ea46b4f.png", apple: "/brand/icon-2b5e6ea46b4f.png" },
  description: "Share your presentations in real-time with your audience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
