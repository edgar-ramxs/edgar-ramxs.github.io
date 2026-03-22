import profile from '@data/cv/profile.json';
import skills from '@data/cv/skills.json';
import education from '@data/cv/education.json';
import works from '@data/cv/works.json';
import projects from '@data/cv/projects.json';

// --- Interfaces ---
export interface CV {
  profile: Profile;
  skills: Skills;
  education: EducationData;
  works: Array<Work>;
  projects: Array<Project>;
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

export interface EducationData {
  certificates: Array<Certificate>;
  degrees: Array<Degree>;
}

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
  name: string;
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
  name: string;
  isActive: boolean;
  description: string;
  highlights: Array<string>;
  stack: Array<string>;
  url?: string;
  github?: string;
}

type DateStr = `${string}-${string}-${string}`;

// --- Data Implementation ---
const cv: CV = {
  profile,
  skills,
  education: education as unknown as EducationData,
  works: works as unknown as Array<Work>,
  projects: projects as unknown as Array<Project>
};

export default cv;