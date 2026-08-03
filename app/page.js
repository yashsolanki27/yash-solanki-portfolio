import Navbar from "@/components/ui/Navbar";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import IntroExperience from "@/components/ui/IntroExperience";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import DevToolingSection from "@/components/sections/DevToolingSection";
import WorkExperienceSection from "@/components/sections/WorkExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import PublicationsFooterSection from "@/components/sections/PublicationsFooterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollAnimations />
      <main>
        <IntroExperience />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <DevToolingSection />
        <WorkExperienceSection />
        <EducationSection />
        <PublicationsFooterSection />
      </main>
    </>
  );
}
