export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yash-portfolio-silk.vercel.app";

  return [
    {
      url: base,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
