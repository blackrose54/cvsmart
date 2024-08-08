import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { cn } from "@/lib/utils";
import { Noto_Serif } from "next/font/google";
import AchievementPreview from "./AchievementPreview";
import EducationPreview from "./EducationPreview";
import ExperiencePreview from "./ExperiencePreview";
import ExtraCarricularPreview from "./ExtraCarricularPreview";
import PersonalPreview from "./PersonalPreview";
import ProjectPreview from "./ProjectPreview";
import SkillPreview from "./SkillPreview";

const noto = Noto_Serif({ subsets: ["latin"] });

function PreviewJake({ resumeInfo }: { resumeInfo: ResumeData }) {
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
      
      
    </div>
  );
}

export default PreviewJake;
