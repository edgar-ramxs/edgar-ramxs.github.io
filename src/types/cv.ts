import profiles from "@data/profiles.json";
import languages from "@data/languages.json";
import details from "@data/details.json";
import skills from "@data/skills.json";
import education from "@data/education.json";
import works from "@data/experiences.json";
import certifications from "@data/certifications.json";
import matter from "gray-matter";
import { readFile } from "fs/promises";
import { join } from "path";

// --- Interfaces ---
export interface CV {
  profile: Profile;
  skills: Skill[];
  education: EducationData;
  works: Work[];
  projects: Project[];
  certifications: Certification[];
}

export interface HeroConfig {
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  importantStats?: Array<{
    number: string;
    label: string;
    icon?: string;
    variant?: "default" | "accent";
  }>;
  lema?: string;
  heroDescription?: string[];
}

export interface Profile {
  name: string;
  nameItalic: string;
  occupation: string;
  company: string;
  companyUrl?: string;
  image: string;
  email: string;
  importantSkills?: string;
  hero?: HeroConfig;
  currentLocation: Location;
  languages: Language[];
  profiles: SocialProfile[];
}

export interface Location {
  country: string;
  state: string;
  city: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface SocialProfile {
  network: string;
  url: string;
  icon: string;
  color: string;
  username?: string;
}

export interface Skill {
  id: string;
  name: string;
  type: "soft" | "technical";
  level?: string;
  icon: string;
  keywords?: string[];
}

export type EducationData = Degree[];

export interface Degree {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: DateStr;
  endDate: DateStr;
  location: string;
}

export interface Work {
  id: string;
  name: string;
  icon: string;
  position: string;
  url: string;
  startDate: DateStr;
  endDate: DateStr | null;
  summary: string;
  location: string;
  location_type: string;
  responsibilities: string[];
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  highlights: string[];
  stack: string[];
  url?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  date: DateStr;
  issuer: string;
  icon: string;
  url: string;
  description: string;
  skills: string[];
}

type DateStr = `${string}-${string}-${string}`;

// --- Projects Loader ---
async function loadProjects() {
  const projectsDir = join(process.cwd(), "src/data/projects");
  const { readdir } = await import("fs/promises");
  const files = await readdir(projectsDir);

  const results = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (fileName) => {
        const filePath = join(projectsDir, fileName);
        const raw = await readFile(filePath, "utf-8");
        const { data } = matter(raw);
        return data as unknown as Project;
      })
  );

  return results;
}

let projectsDataCache: Project[] | null = null;

export async function getProjectsData(): Promise<Project[]> {
  if (!projectsDataCache) {
    projectsDataCache = await loadProjects();
  }
  return projectsDataCache;
}

// --- Data Implementation ---
const nameParts = details.name.split(" ");
const nameItalic = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
const lema = details.lema;
const heroDescription = details.description;

const profile: Profile = {
  ...details,
  nameItalic,
  currentLocation: details.currentLocation as Location,
  languages: languages as unknown as Language[],
  profiles: profiles as unknown as SocialProfile[],
  hero: {
    eyebrow: "Disponible para proyectos",
    primaryCta: { label: "Ver proyectos", href: "/projects" },
    secondaryCta: { label: "Contacto", href: "/contact" },
    importantStats: [
      { number: "2+", label: "Años de experiencia", icon: "ph:briefcase" },
      { number: "∞", label: "Curiosidad por los datos", icon: "ph:magnifying-glass" },
      { number: "100%", label: "Orientado a resultados", icon: "ph:chart-bar", variant: "accent" },
      { number: "Open", label: "Disponible para proyectos", icon: "ph:rocket-launch" },
    ],
    lema,
    heroDescription,
  },
};

const cv: CV = {
  profile,
  skills: skills as Skill[],
  education: education as unknown as EducationData,
  works: works as unknown as Work[],
  certifications: certifications as unknown as Certification[],
};

// --- Named Exports ---
export const profileData = cv.profile;
export const skillsData = cv.skills;
export const worksData = cv.works;
export const certificationsData = cv.certifications;

// --- Helper Functions ---
export const getSkillById = (id: string): Skill | undefined => skillsData.find((s) => s.id === id);

export const getSkillIcon = (skillRef: string): string | undefined => {
  const skill = skillsData.find((s) => s.id === skillRef || s.name === skillRef);
  return skill?.icon;
};

export const getSkillByName = (name: string): Skill | undefined =>
  skillsData.find((s) => s.name === name);

export const getSkillByIdOrName = (ref: string): Skill | undefined =>
  skillsData.find((s) => s.id === ref || s.name === ref);

export const technicalSkills = (): Skill[] => skillsData.filter((s) => s.type === "technical");

export const softSkills = (): Skill[] => skillsData.filter((s) => s.type === "soft");

export const skillsByType = (type: "soft" | "technical"): Skill[] =>
  skillsData.filter((s) => s.type === type);
