import { describe, it, expect } from "vitest";
import profile from "@/data/profile.json";
import content from "@/data/content.json";

describe("profile.json structure", () => {
  it("has required name fields", () => {
    expect(profile.name).toBeDefined();
    expect(profile.name.first).toBeTypeOf("string");
    expect(profile.name.last).toBeTypeOf("string");
    expect(profile.name.full).toBeTypeOf("string");
  });

  it("has valid social links", () => {
    expect(Array.isArray(profile.socials)).toBe(true);
    expect(profile.socials.length).toBeGreaterThan(0);
    profile.socials.forEach((s) => {
      expect(s.label).toBeTypeOf("string");
      expect(s.href).toBeTypeOf("string");
    });
  });

  it("has resume URL pointing to a PDF when set", () => {
    expect(typeof profile.resumeUrl).toBe("string");
    if (profile.resumeUrl) {
      expect(profile.resumeUrl).toMatch(/\.pdf$/);
    }
  });

  it("has at least one project", () => {
    expect(Array.isArray(profile.projects)).toBe(true);
    expect(profile.projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    profile.projects.forEach((p) => {
      expect(p.id).toBeDefined();
      expect(p.title).toBeTypeOf("string");
      expect(p.desc).toBeTypeOf("string");
      expect(Array.isArray(p.tech)).toBe(true);
    });
  });

  it("has at least one case study", () => {
    expect(Array.isArray(profile.caseStudies)).toBe(true);
    expect(profile.caseStudies.length).toBeGreaterThan(0);
  });

  it("each case study has required fields", () => {
    profile.caseStudies.forEach((cs) => {
      expect(cs.id).toBeDefined();
      expect(cs.title).toBeTypeOf("string");
      expect(cs.desc).toBeTypeOf("string");
      expect(Array.isArray(cs.tags)).toBe(true);
    });
  });

  it("has education data", () => {
    expect(profile.education).toBeDefined();
    expect(profile.education.degree).toBeTypeOf("string");
    expect(profile.education.institution).toBeTypeOf("string");
  });

  it("has experience entries", () => {
    expect(Array.isArray(profile.experience)).toBe(true);
    expect(profile.experience.length).toBeGreaterThan(0);
    profile.experience.forEach((exp) => {
      expect(exp.role).toBeTypeOf("string");
      expect(exp.company).toBeTypeOf("string");
      expect(exp.period).toBeTypeOf("string");
    });
  });

  it("has stats array", () => {
    expect(Array.isArray(profile.stats)).toBe(true);
    profile.stats.forEach((s) => {
      expect(s.value).toBeTypeOf("string");
      expect(s.label).toBeTypeOf("string");
    });
  });

  it("has strengths array", () => {
    expect(Array.isArray(profile.strengths)).toBe(true);
    expect(profile.strengths.length).toBeGreaterThan(0);
  });

  it("has skillCategories for footer", () => {
    expect(Array.isArray(profile.skillCategories)).toBe(true);
    profile.skillCategories.forEach((cat) => {
      expect(cat.title).toBeTypeOf("string");
      expect(Array.isArray(cat.items)).toBe(true);
    });
  });

  it("has devSkillCategories for dev tooling section", () => {
    expect(Array.isArray(profile.devSkillCategories)).toBe(true);
    profile.devSkillCategories.forEach((cat) => {
      expect(cat.title).toBeTypeOf("string");
      expect(Array.isArray(cat.items)).toBe(true);
    });
  });
});

describe("content.json structure", () => {
  it("has hero content", () => {
    expect(content.hero).toBeDefined();
    expect(Array.isArray(content.hero.pills)).toBe(true);
    expect(content.hero.cta).toBeTypeOf("string");
  });

  it("has section labels", () => {
    expect(content.sections).toBeDefined();
    expect(content.sections.about).toBeTypeOf("string");
    expect(content.sections.projects).toBeTypeOf("string");
    expect(content.sections.experience).toBeTypeOf("string");
  });

  it("has footer content", () => {
    expect(content.footer).toBeDefined();
    expect(content.footer.eyebrow).toBeTypeOf("string");
    expect(content.footer.cta).toBeTypeOf("string");
  });
});
