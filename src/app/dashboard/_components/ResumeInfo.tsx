"use client";

import {
  AcademicAchievements,
  Resume,
  Education,
  Experience,
  ExtraCarricular,
  Projects,
  Skills,
} from "@prisma/client";
import { createContext, ReactNode, useContext } from "react";

export type ResumeData =(Resume & {

  Experience: Experience[];
  Skills: Skills[];
  Education: Education[];
  AcademicAchievements: AcademicAchievements[];
  Projects: Projects[];
  ExtraCarricular: ExtraCarricular[];
}) | null;

const ResumeInfoContext = createContext<ResumeData>(null);

export const useResumeInfo = () => {
  const context = useContext(ResumeInfoContext);
  if (context === undefined) {
    throw new Error("useResumeInfo must be used within a ResumeInfoProvider");
  }
  return context;
};

export const ResumeInfoProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ResumeData;
}) => {
  return (
    <ResumeInfoContext.Provider value={value}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
