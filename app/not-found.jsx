import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        padding: "0 6vw",
      }}
    >
      <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300 }}>Page not found.</h1>
      <p style={{ opacity: 0.6, fontSize: 14 }}>
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        style={{
          border: "1px solid rgba(235, 178, 124, 0.5)",
          borderRadius: "999px",
          padding: "12px 26px",
          fontSize: 13,
          letterSpacing: "0.08em",
        }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
