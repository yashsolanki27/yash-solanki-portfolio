import profile from "@/data/profile.json";
import content from "@/data/content.json";
import ContactForm from "@/components/sections/ContactForm";
import CopyEmailLink from "@/components/ui/CopyEmailLink";
import styles from "@/styles/sections/PublicationsFooterSection.module.css";

export default function PublicationsFooterSection() {
  return (
    <section className={styles.section} id="footer">
      <div className={styles.top}>
        <p className={styles.label} data-reveal>{content.sections.credibility}</p>
        <h2 className={styles.sectionTitle} data-reveal>
          Credibility that<br />goes beyond the resume
        </h2>
        <div className={styles.columns} data-reveal>
          <div>
            <p className={styles.colTitle}>Achievements</p>
            {profile.achievements.map((item) => (
              <p key={item} className={styles.item}>{item}</p>
            ))}
          </div>
          {profile.certifications?.length > 0 && (
            <div>
              <p className={styles.colTitle}>Certifications</p>
              {profile.certifications.map((item) => (
                <p key={item.name} className={styles.item}>
                  {item.name} <span style={{ opacity: 0.55 }}>— {item.issuer}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Core tools & skills — categorized */}
        <div className={styles.skillsBlock} data-reveal>
          <p className={styles.colTitle}>Core Tools & Skills</p>
          <div className={styles.skillGrid}>
            {profile.skillCategories.map((cat) => (
              <div key={cat.title} className={styles.skillCategory}>
                <p className={styles.skillCatTitle}>{cat.title}</p>
                <div className={styles.skillTags}>
                  {cat.items.map((item) => (
                    <span key={item} className={styles.skillTag}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className={styles.footerCta} id="contact" data-reveal>
        <p className={styles.eyebrow}>{content.footer.eyebrow}</p>
        <h2 className={styles.footerName}>{profile.name.full}</h2>
        <p className={styles.footerTagline}>{content.footer.cta}</p>

        <ContactForm />

        <div className={styles.ctaRow}>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.button}
              style={{ background: "transparent", border: "1px solid rgba(235, 178, 124, 0.5)" }}
            >
              Download Resume ↓
            </a>
          )}
          <div className={styles.footerLinks}>
            {profile.socials.map((s) =>
              s.label === "Email" ? (
                <CopyEmailLink
                  key={s.label}
                  email={s.href.replace("mailto:", "")}
                  className={styles.footerLink}
                />
              ) : (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.footerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              )
            )}
          </div>
        </div>
        <p className={styles.copyright}>
          © 2026 {profile.name.full} · {profile.location.city}, {profile.location.country}
        </p>
      </div>
    </section>
  );
}
