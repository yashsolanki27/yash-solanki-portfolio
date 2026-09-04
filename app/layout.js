import { Fraunces, Inter } from "next/font/google";
import profile from "@/data/profile.json";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yash-portfolio-silk.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yash Solanki | AI-Driven Application Engineering",
  description:
    "Portfolio for Yash Solanki, an Application Support Engineer doing AI-driven Application Engineering — root cause analysis, SLA-driven operations, and GenAI-assisted RCA & ticket triage across enterprise CRM & OSS/BSS platforms.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yash Solanki | AI-Driven Application Engineering",
    description:
      "AI-driven Application Engineering — root cause analysis, SLA-driven operations, and GenAI-assisted RCA & ticket triage across enterprise CRM (Swisscom) and national OSS/BSS platform (BSNL).",
    url: SITE_URL,
    siteName: "Yash Solanki",
    images: [
      {
        url: "/mainog2.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Yash Solanki — AI-Driven Application Engineering",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Solanki | AI-Driven Application Engineering",
    description:
      "AI-driven Application Engineering — CRM & OSS/BSS · Root Cause Analysis · SLA-Driven Operations.",
    images: ["/mainog2.jpg?v=3"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name.full,
    jobTitle: profile.headline,
    description: profile.description,
    url: SITE_URL,
    image: `${SITE_URL}/assets/YASH.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.country,
    },
    sameAs: profile.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
    knowsAbout: profile.strengths,
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
