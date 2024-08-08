import React from "react";
import PersonalPreview from "./PersonalPreview";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { Noto_Serif, IBM_Plex_Serif } from "next/font/google";
import { cn } from "@/lib/utils";
import EducationPreview from "./EducationPreview";
import ExperiencePreview from "./ExperiencePreview";
import ProjectPreview from "./ProjectPreview";
import SkillPreview from "./SkillPreview";
import AchievementPreview from "./AchievementPreview";
import ExtraCarricularPreview from "./ExtraCarricularPreview";
import PositionOfResponsibilityPreview from "./PositionOfResposibiltyPreview";

const noto = Noto_Serif({ subsets: ["latin"] });

function PreviewDTU({ resumeInfo }: { resumeInfo: ResumeData }) {
  return (
    <div
      className={cn(
        noto.className,
        " bg-white space-y-4 h-full rsw-ce rounded-sm font-serif text-black pb-20"
      )}
    >
      {/* Personal Details */}
      {resumeInfo && (
        <PersonalPreview
          first_name={resumeInfo?.first_name}
          last_name={resumeInfo?.last_name}
          phone={resumeInfo?.phone}
          email={resumeInfo?.email}
          linkedin={resumeInfo?.linkedin}
          github={resumeInfo?.github}
          rollNo={resumeInfo?.rollNo}
        />
      )}
      {/* Education */}
      {resumeInfo?.Education && resumeInfo.Education.length > 0 && (
        <EducationPreview edu={resumeInfo?.Education} />
      )}
      {/* Experience */}
      {resumeInfo?.Experience && resumeInfo.Experience.length > 0 && (
        <ExperiencePreview exp={resumeInfo?.Experience} />
      )}
      {/* Projects */}
      {resumeInfo?.Projects && resumeInfo.Projects.length > 0 && (
        <ProjectPreview proj={resumeInfo?.Projects} />
      )}
      {/* Skills */}
      {resumeInfo?.Skills && resumeInfo.Skills.length > 0 && (
        <SkillPreview skills={resumeInfo?.Skills} />
      )}
      {/* Achievements */}
      {resumeInfo?.AcademicAchievements &&
        resumeInfo.AcademicAchievements.length > 0 && (
          <AchievementPreview achievements={resumeInfo?.AcademicAchievements} />
        )}
      {/* Extra Carricular */}
      {resumeInfo?.ExtraCarricular && resumeInfo.ExtraCarricular.length > 0 && (
        <ExtraCarricularPreview extra={resumeInfo?.ExtraCarricular} />
      )}
      
      {/* Positions of Responsibility */}
      {resumeInfo?.Positions && resumeInfo.Positions.length > 0 && (
        <PositionOfResponsibilityPreview  positions={resumeInfo?.Positions} />
      )}
    </div>
  );
}

export default PreviewDTU;
