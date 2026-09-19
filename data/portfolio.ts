import { experiencesData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { caseStudies } from "@/data/projects";
import { skillsData } from "@/data/skills";

/**
 * The public content registry for the portfolio.
 * Keep presentation code out of these files so content can grow independently.
 */
export const portfolioContent = {
  profile: profileData,
  projects: caseStudies,
  skills: skillsData,
  experience: experiencesData,
} as const;

export const projectAccents = ["#e0ddd5", "#9b9891"] as const;

export const allTools = Array.from(
  new Set([
    ...caseStudies.flatMap((study) => study.toolsAndTech),
    ...skillsData.flatMap((group) => group.skills.map((skill) => skill.name)),
    "Burp Suite",
  ]),
);
