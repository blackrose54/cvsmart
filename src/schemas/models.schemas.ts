import { z } from "zod";

export const ResmueSchema = z.object({
  id: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  jobtitle: z.string().optional(),
  summary: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export const ExperienceSchema = z.object({
  id: z.number().optional(),
  resumeId: z.string(),
  position_title: z.string(),
  company_name: z.string(),
  city: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  summary: z.string(),
});

export const EducationSchema = z.object({
  id: z.number().optional(),
  resumeId: z.string(),
  institution_name: z.string(),
  course: z.string(),
  grade: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  location: z.string(),
});

export const SkillsSchema = z.object({
  id: z.number().optional(),
  resumeId: z.string(),
  name: z.string(),
  type: z.enum(["Framework", "Language", "Tools"]),
});

export const ProjectsSchema = z.object({
  id: z.number().optional(),
  resumeId: z.string(),
  name: z.string(),
  description: z.string(),
  tags: z.string(),
  liveLink: z.string().optional(),
  githubLink: z.string().optional(),
});

export const AcademicAchievementsSchema = z.object({
  id:z.number().optional(),
  resumeId: z.string(),
  achivement: z.string(),
});

export const ExtraCarricularSchema = z.object({
  id:z.number().optional(),
  resumeId: z.string(),
  activity: z.string(),
});
