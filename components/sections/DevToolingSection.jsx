import profile from "@/data/profile.json";
import styles from "@/styles/sections/DevToolingSection.module.css";

export default function DevToolingSection() {
  return (
    <section className={styles.section} id="devtooling">
      <p className={styles.label} data-reveal>AI/LLM Engineering & Dev Tooling</p>
      <h2 className={styles.heading} data-reveal>
        The stack behind<br />AI-driven operations
      </h2>
      <p className={styles.intro} data-reveal>
        Beyond production support — building RAG pipelines, agentic workflows,
        and LLM-based intelligence layers on enterprise telecom systems.
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
