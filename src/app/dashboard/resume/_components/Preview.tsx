import React from "react";
import PersonalPreview from "./previews/PersonalPreview";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import {Noto_Serif,IBM_Plex_Serif} from 'next/font/google'
import { cn } from "@/lib/utils";
import EducationPreview from "./previews/EducationPreview";
import ExperiencePreview from "./previews/ExperiencePreview";
import ProjectPreview from "./previews/ProjectPreview";
import SkillPreview from "./previews/SkillPreview";
import AchievementPreview from "./previews/AchievementPreview";
import ExtraCarricularPreview from "./previews/ExtraCarricularPreview";

const noto = Noto_Serif({subsets:["latin"]})

function Preview({ resumeInfo }: { resumeInfo: ResumeData }) {

  return (
    <div className={cn(noto.className," bg-white space-y-4 h-full rsw-ce rounded-sm font-serif text-black pb-20")}>
      {/* Personal Details */}
      <PersonalPreview
        first_name={resumeInfo?.first_name}
        last_name={resumeInfo?.last_name}
        phone={resumeInfo?.phone}
        email={resumeInfo?.email}
        linkedin={resumeInfo?.linkedin}
        github={resumeInfo?.github}
      />
      {/* Education */}
      <EducationPreview edu={resumeInfo?.Education} />
      {/* Experience */}
      <ExperiencePreview exp={resumeInfo?.Experience} />
      {/* Projects */}
      <ProjectPreview proj={resumeInfo?.Projects} />
      {/* Skills */}
      <SkillPreview skills={resumeInfo?.Skills} />
      {/* Achievements */}
      <AchievementPreview achievements={resumeInfo?.AcademicAchievements} />
      {/* Extra Carricular */}
      <ExtraCarricularPreview extra={resumeInfo?.ExtraCarricular} />
    </div>
  );
}

export default Preview;
