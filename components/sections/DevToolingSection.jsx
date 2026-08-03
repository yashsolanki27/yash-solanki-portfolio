import profile from "@/data/profile.json";
import styles from "@/styles/sections/DevToolingSection.module.css";

export default function DevToolingSection() {
  return (
    <section className={styles.section} id="devtooling">
      <p className={styles.label} data-reveal>Dev Tooling & Personal Projects</p>
      <h2 className={styles.heading} data-reveal>
        The stack behind<br />what I build on the side
      </h2>
      <p className={styles.intro} data-reveal>
        Alongside production support work, this is the stack used for personal
        projects — full-stack builds, scripting, and shipping small tools end to end.
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
