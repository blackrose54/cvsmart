import { Education } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

export default function EducationPreview({
  edu,
}: {
  edu?: Education[] | null;
}) {
  return (
    <div className=" w-[90%] mx-auto space-y-2 ">
      <h1 className="  bg-slate-200 font-semibold px-2 border-[1px] uppercase">
        Education
      </h1>

      <table className=" w-full table-fixed">
        {edu?.map((education) => {
          return (
            <tr
              key={education.id}
              className=" text-sm "
            >
              <td className="w-[37%] pl-2">
                {education.course}
              </td>
              <td className="w-[15%] text-center ">
                  {format(education.startdate, "yyy")} -{" "}
                  {format(education.enddate, "yyy")}
              </td>
              <td className="w-[40%] pl-3">
                {education.institution_name}
              </td>

              <td className=" text-center">
                {education.grade}
              </td>

              
            </tr>
          );
        })}
      </table>
    </div>
  );
}
