import profile from "@data/profile.json";
import skills from "@data/skills.json";
import education from "@data/education.json";
import works from "@data/experiences.json";
import projects from "@data/projects.json";
import certifications from "@data/certifications.json";

// --- Interfaces ---
export interface CV {
  profile: Profile;
  skills: Skills;
  education: EducationData;
  works: Array<Work>;
  projects: Array<Project>;
  certifications: Array<Certification>;
}

export interface Profile {
  name: string;
  occupation: string;
  image: string;
  email: string;
  description: string;
  birthPlace: Location;
  currentLocation: Location;
  languages: Array<Language>;
  profiles: Array<SocialProfile>;
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

export interface Skills {
  Softs: Array<string>;
  Technicals: Array<TechnicalSkill>;
}

export interface TechnicalSkill {
  icon: string;
  name: string;
  level: string;
  keywords: Array<string>;
}

export type EducationData = Array<Degree>;

export interface Certificate {
  name: string;
  date: DateStr;
  issuer: string;
  url: string;
}

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
  responsibilities: Array<string>;
  skills: Array<string>;
}

export interface Project {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  highlights: Array<string>;
  stack: Array<string>;
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
  skills: Array<string>;
}

type DateStr = `${string}-${string}-${string}`;

// --- Data Implementation ---
const cv: CV = {
  profile,
  skills,
  education: education as unknown as EducationData,
  works: works as unknown as Array<Work>,
  projects: projects as unknown as Array<Project>,
  certifications: certifications as unknown as Array<Certification>,
};

export default cv;

// --- Named Exports ---
export const { profile: profileData } = cv;
export const { skills: skillsData } = cv;
export const { works: worksData } = cv;
export const { projects: projectsData } = cv;
export const { certifications: certificationsData } = cv;
