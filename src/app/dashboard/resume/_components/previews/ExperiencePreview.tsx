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
    <div className=" w-[90%] mx-auto mt-2 ">
      <h1 className=" text-xl ">Experience</h1>
      <div className=" h-[1.7px] bg-slate-900 mb-2" />

      <div className=" mx-2 space-y-2 ">
        {exp?.map((experience) => {
          return (
            <div key={experience.id}>
              <div className=" flex items-center justify-between">
                <div>
                  <h2 className=" font-bold">{experience.position_title}</h2>
                  <p className=" text-sm italic">{experience.company_name}</p>
                </div>

                <div className=" text-nowrap self-start text-end">
                  <p className=" text-end text-sm">{experience.city}</p>
                  <p className=" italic text-xs justify-self-end">
                    {format(experience.startDate, "LLL yyy")} -{" "}
                    {format(experience.endDate, "LLL yyy")}
                  </p>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: experience.summary
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
