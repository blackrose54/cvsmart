import { Experience } from "@prisma/client";
import { format } from "date-fns";
import React, { FC, ReactElement } from "react";

interface ExperiencePreviewProps {
  exp?: Experience[] | null;
}

const ExperiencePreview: FC<ExperiencePreviewProps> = ({
  exp,
}): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto space-y-2 ">
      <h1 className="  bg-slate-200 font-semibold px-2 border-[1px] uppercase ">
        Experience
      </h1>

      <div className=" mx-2 space-y-2 ">
        {exp?.map((experience) => {
          return (
            <div key={experience.id}>
              <div className=" flex items-center justify-between">
                <div className=" flex items-center gap-x-1 font-bold">
                  <h2 className=" font-bold">{experience.position_title}</h2>,
                  <p className=" text-sm italic">{experience.company_name}</p>,
                  <p className=" text-end text-sm">{experience.city}</p>
                </div>

                <div className=" text-nowrap self-start text-end">
                  <p className=" italic text-xs justify-self-end">
                    {format(experience.startDate, "LLL yyy")} -{" "}
                    {format(experience.endDate, "LLL yyy")}
                  </p>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: experience.summary,
                }}
                className="text-xs"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperiencePreview;
