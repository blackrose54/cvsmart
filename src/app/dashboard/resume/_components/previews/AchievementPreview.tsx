import { AcademicAchievements } from "@prisma/client";
import { FC, ReactElement } from "react";

interface SkillPreviewProps {
  achievements?: AcademicAchievements[] | null;
}

const AchievementPreview: FC<SkillPreviewProps> = ({
  achievements,
}): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto mt-2 ">
      <h1 className=" text-xl ">Academic Achievements and Awards</h1>
      <div className=" h-[1.7px] bg-slate-900 mb-2" />

      <ul className="mx-2 list-disc list-inside text-sm">
        {achievements?.map((achievement) => (
          <li key={achievement.id}>{achievement.achivement}</li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementPreview;
