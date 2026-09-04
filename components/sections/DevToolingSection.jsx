import profile from "@/data/profile.json";
import styles from "@/styles/sections/DevToolingSection.module.css";

export default function DevToolingSection() {
  return (
    <section className={styles.section} id="devtooling">
      <p className={styles.label} data-reveal>Core Skills & Tooling</p>
      <h2 className={styles.heading} data-reveal>
        The toolkit behind<br />application support
      </h2>
      <p className={styles.intro} data-reveal>
        Application support across enterprise CRM and OSS/BSS platforms — root cause analysis,
        SLA-driven operations, and GenAI-assisted RCA & ticket triage.
      </p>
      <div className={styles.grid} data-reveal>
        {profile.devSkillCategories.map((cat) => (
          <div key={cat.title} className={styles.category}>
            <p className={styles.catTitle}>{cat.title}</p>
            <div className={styles.tags}>
              {cat.items.map((item) => (
                <span key={item} className={styles.tag}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
