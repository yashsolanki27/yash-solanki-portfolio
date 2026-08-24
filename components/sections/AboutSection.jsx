import profile from "@/data/profile.json";
import content from "@/data/content.json";
import styles from "@/styles/sections/AboutSection.module.css";

const SKILLS = profile.strengths;

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <p className={styles.label} data-reveal>{content.sections.about}</p>
      <h2 className={styles.heading} data-reveal>
        Tickets to root cause<br />to systems that stay fixed.
      </h2>
      <p className={styles.bio} data-reveal>{profile.bio}</p>

      {/* Experience timeline */}
      <div className={styles.timeline}>
        {profile.experience.map((item, i) => (
          <div key={i} className={styles.timelineItem} data-reveal>
            <span className={styles.period}>{item.period}</span>
            <div>
              <div className={styles.role}>{item.role}</div>
              <div className={styles.company}>{item.company}</div>
              <div className={styles.focus}>{item.focus}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic scrolling skills band */}
      <div className={styles.skillBand} data-reveal>
        <div className={styles.skillTrack}>
          {SKILLS.map((skill) => (
            <span key={skill} className={styles.skillItem}>
              {skill}
            </span>
          ))}
          {SKILLS.map((skill) => (
            <span key={`dup-${skill}`} className={styles.skillItem} aria-hidden="true">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
