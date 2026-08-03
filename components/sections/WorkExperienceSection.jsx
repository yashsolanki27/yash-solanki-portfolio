import profile from "@/data/profile.json";
import content from "@/data/content.json";
import styles from "@/styles/sections/WorkExperienceSection.module.css";

export default function WorkExperienceSection() {
  return (
    <section className={styles.section} id="casestudies">
      <p className={styles.label} data-reveal>{content.sections.experience}</p>
      <h2 className={styles.sectionTitle} data-reveal>
        Production incidents,<br />solved end to end
      </h2>
      <div className={styles.grid}>
        {profile.caseStudies.map((item) => (
          <article key={item.id} className={styles.card} data-reveal>
            <span className={styles.cardNum}>{String(item.id).padStart(2, "0")}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.subtitle}>{item.subtitle}</p>
            <p className={styles.desc}>{item.desc}</p>
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
