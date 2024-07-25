"use client";

import {
  createEducation,
  deleteEducation,
  updateEducation,
} from "@/actions/crudEducation";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { EducationSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import EducationForm from "./forms/educationform";

interface EducationProps {
  details: ResumeData;
}

const Education: FC<EducationProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number>(-1);
  const { toast } = useToast();

  async function createEdu(values: z.infer<typeof EducationSchema>) {
    const res = await createEducation({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Education Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Education",
      });
  }

  async function updateEdu(values: z.infer<typeof EducationSchema>) {
    console.log(values);
    const res = await updateEducation({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Education Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Education",
      });
  }

  async function deleteEdu(id:number|undefined, resumeId:string) {
    const res = await deleteEducation(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Education Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Education",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.Education.map((education) => {
        if (edit == education.id)
          return (
            <EducationForm
              course={education.course}
              enddate={education.enddate}
              startdate={education.startdate}
              grade={education.grade}
              institution_name={education.institution_name}
              location={education.location}
              resumeId={education.resumeId}
              key={education.id}
              edit={setedit}
              onSubmit={updateEdu}
              id={education.id}
              onDelete={deleteEdu}
            />
          );

        return (
          <div
            key={education.id}
            onClick={() => setedit(education.id)}
            className="p-8 border-2 rounded-sm rounded-t-lg border-t-8"
          >
            {education.institution_name}
          </div>
        );
      })}

      {edit === -1 && (
        <EducationForm
          edit={setedit}
          resumeId={details?.id}
          onSubmit={createEdu}

        />
      )}
    </div>
  );
};

export default Education;
