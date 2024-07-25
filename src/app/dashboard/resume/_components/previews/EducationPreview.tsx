import { Education } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

export default function EducationPreview({
  edu,
}: {
  edu?: Education[] | null;
}) {
  return (
    <div className=" w-[90%] mx-auto ">
      <h1 className=" text-xl ">Education</h1>
      <div className=" h-[1.7px] bg-slate-900 mb-2" />

      <div className=" mx-2 space-y-4">
        {edu?.map((education) => {
          return (
            <div
              key={education.id}
              className=" flex items-center justify-between gap-x-10 "
            >
              <div>
                <h2 className=" font-bold">{education.institution_name}</h2>
                <p className=" text-sm italic">{education.course}</p>
              </div>

              <div className=" text-sm">
                <p className=" text-end">{education.location}</p>
                <p className=" italic text-sm">
                  {format(education.startdate, "LLL yyy")} -{" "}
                  {format(education.enddate, "LLL yyy")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
