export default function sitemap() {
  const base = "https://yash-portfolio-silk.vercel.app";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
