"use client";

export default function Error({ error, reset }) {
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
      <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300 }}>
        Something went wrong.
      </h1>
      <p style={{ opacity: 0.6, fontSize: 14 }}>
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          border: "1px solid rgba(235, 178, 124, 0.5)",
          borderRadius: "999px",
          padding: "12px 26px",
          background: "transparent",
          color: "#f6f1e8",
          cursor: "pointer",
          fontSize: 13,
          letterSpacing: "0.08em",
        }}
      >
        Try again →
      </button>
    </div>
  );
}
