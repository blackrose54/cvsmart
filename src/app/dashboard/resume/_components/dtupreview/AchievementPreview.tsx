import { AcademicAchievements } from "@prisma/client";
import { FC, ReactElement } from "react";

interface SkillPreviewProps {
  achievements?: AcademicAchievements[] | null;
}

const AchievementPreview: FC<SkillPreviewProps> = ({
  achievements,
}): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto space-y-2 ">
      <h1 className=" bg-slate-200 font-semibold px-2 border-[1px] uppercase ">
        Academic Achievements and Awards
      </h1>

      <ul className="mx-2 list-disc list-inside text-sm">
        {achievements?.map((achievement) => (
          <li key={achievement.id}>{achievement.achivement}</li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementPreview;
