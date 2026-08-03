import profile from "@/data/profile.json";
import content from "@/data/content.json";
import styles from "@/styles/sections/ProjectsSection.module.css";

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.header} data-reveal>
        <div>
          <p className={styles.label}>{content.sections.projects}</p>
          <h2 className={styles.sectionTitle}>Things built to keep<br />systems running</h2>
        </div>
      </div>
      <div className={styles.list}>
        {profile.projects.map((project, index) => (
          <article key={project.id} className={styles.card} data-reveal>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.meta}>
              <span className={styles.type}>{project.type}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.subtitle}>{project.subtitle}</p>
              <p className={styles.desc}>{project.desc}</p>
              <div className={styles.tech}>
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className={styles.linkCol}>
              {project.link && project.link !== "PLACEHOLDER_REPO_LINK" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  Code ↗
                </a>
              ) : (
                <span className={styles.link} style={{ opacity: 0.5, cursor: "default" }}>
                  Repo Coming Soon
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
