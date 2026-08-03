"use client";

import { useState } from "react";

export default function CopyEmailLink({ email, label = "Email", className }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers without Clipboard API permission — a hidden
      // textarea select+copy still works without ever touching mailto:.
      const el = document.createElement("textarea");
      el.value = email;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {copied ? "Copied ✓" : label}
    </button>
  );
}
