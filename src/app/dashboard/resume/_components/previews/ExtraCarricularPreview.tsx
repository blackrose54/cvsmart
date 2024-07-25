import { AcademicAchievements, ExtraCarricular } from "@prisma/client";
import { FC, ReactElement } from "react";

interface SkillPreviewProps {
  extra?: ExtraCarricular[] | null;
}

const ExtraCarricularPreview: FC<SkillPreviewProps> = ({
  extra
}): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto mt-2 ">
      <h1 className=" text-xl ">Extra-Carricular Activites and Achievements</h1>
      <div className=" h-[1.7px] bg-slate-900 mb-2" />

      <ul className="mx-2 list-disc list-inside text-sm">
        {extra?.map((achievement) => (
          <li key={achievement.id}>{achievement.activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExtraCarricularPreview;
