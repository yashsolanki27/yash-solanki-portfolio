import profile from "@/data/profile.json";
import styles from "@/styles/sections/EducationSection.module.css";

export default function EducationSection() {
  const { degree, institution, location, period, cgpa } = profile.education;

  return (
    <section className={styles.section} id="education">
      <p className={styles.label} data-reveal>Education</p>
      <h2 className={styles.heading} data-reveal>
        Where it started
      </h2>
      <div className={styles.card} data-reveal>
        <span className={styles.period}>{period}</span>
        <div>
          <div className={styles.degree}>{degree}</div>
          <div className={styles.institution}>
            {institution} · {location}
          </div>
          {cgpa && <div className={styles.cgpa}>CGPA: {cgpa}</div>}
        </div>
      </div>
    </section>
  );
}
