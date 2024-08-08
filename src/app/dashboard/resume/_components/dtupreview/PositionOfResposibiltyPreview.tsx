import {
  AcademicAchievements,
  ExtraCarricular,
  Positions,
} from "@prisma/client";
import { FC, ReactElement } from "react";

interface SkillPreviewProps {
  positions?: Positions[] | null;
}

const PositionOfResponsibilityPreview: FC<SkillPreviewProps> = ({
  positions,
}): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto space-y-2 ">
      <h1 className=" bg-slate-200 font-semibold px-2 border-[1px] uppercase ">
        Positions Of Responsibility
      </h1>

      <ul className=" mx-2 space-y-2 ">
        {positions?.map((position) => {
          return (
            <li key={position.id}>
              <div className=" flex items-center justify-between">
                <div className=" flex items-center gap-x-1">
                  <h2 className="">{position.position}</h2>,
                </div>
              </div>
              {position.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: position.description,
                  }}
                  className="text-xs"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PositionOfResponsibilityPreview;
