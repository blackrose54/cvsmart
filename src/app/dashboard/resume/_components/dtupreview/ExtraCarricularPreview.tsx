import { AcademicAchievements, ExtraCarricular } from "@prisma/client";
import { FC, ReactElement } from "react";

interface SkillPreviewProps {
  extra?: ExtraCarricular[] | null;
}

const ExtraCarricularPreview: FC<SkillPreviewProps> = ({
  extra
}): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto space-y-2 ">
         <h1 className=" bg-slate-200 font-semibold px-2 border-[1px] uppercase ">
        ExtraCarricular Activites And Achievements
      </h1>

      <ul className="mx-2 list-disc list-inside text-sm">
        {extra?.map((achievement) => (
          <li key={achievement.id}>{achievement.activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExtraCarricularPreview;
