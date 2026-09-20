import Link from "next/link";
export default function Brand() {
  return (
    <Link href="/" aria-label="slidesync" className="brand-logo">
      <img src="/logo.png" alt="slidesync" width="180" height="40" />
    </Link>
  );
}
