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

const SITE_URL = "https://yash-portfolio-silk.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yash Solanki | Application Support Engineer",
  description:
    "Portfolio for Yash Solanki, Application Support Engineer specializing in CRM & OSS/BSS production support, ITIL v4, and root cause analysis.",
  openGraph: {
    title: "Yash Solanki | Application Support Engineer",
    description:
      "Application Support Engineer fixing root causes, not just tickets — across enterprise CRM and OSS/BSS platforms, including a 100M+ subscriber government telecom deployment.",
    url: SITE_URL,
    siteName: "Yash Solanki",
    images: [
      {
        url: "/mainog2.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Yash Solanki — Application Support Engineer",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Solanki | Application Support Engineer",
    description:
      "Application Support Engineer — CRM & OSS/BSS · ITIL v4 · RCA · SLA-Driven Support.",
    images: ["/mainog2.jpg?v=2"],
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
    url: "https://yash-portfolio-silk.vercel.app",
    image: "https://yash-portfolio-silk.vercel.app/assets/YASH.png",
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
