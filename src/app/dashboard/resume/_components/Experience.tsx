"use client";

import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/actions/crudExperience";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { ExperienceSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import ExperienceForm from "./forms/experienceform";

interface ExperienceProps {
  details: ResumeData;
}

const Experience: FC<ExperienceProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number|undefined>(-1);
  const { toast } = useToast();

  async function createExp(values: z.infer<typeof ExperienceSchema>) {
    console.log(values);
    const res = await createExperience({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Experience Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Experience",
      });
  }

  async function updateExp(values: z.infer<typeof ExperienceSchema>) {
    // console.log(values);
    const res = await updateExperience({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Experience Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Experience",
      });
  }

  async function deleteExp(id: number | undefined, resumeId: string) {
    const res = await deleteExperience(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Experience Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Experience",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.Experience.map((exp) => {
        if (edit == exp.id)
          return (
            <ExperienceForm
              city={exp.city}
              company_name={exp.company_name}
              endDate={exp.endDate}
              position_title={exp.position_title}
              summary={exp.summary}
              id={exp.id}
              resumeId={exp.resumeId}
              startDate={exp.startDate}
              edit={setedit}
              onSubmit={updateExp}
              onDelete={deleteExp}
              key={exp.id}
            />
          );

        return (
          <div
            key={exp.id}
            onClick={() => setedit(exp.id)}
            className="p-8 border-2 rounded-sm rounded-t-lg border-t-8"
          >
            {exp.company_name}
          </div>
        );
      })}

      {edit === -1 && (
        <ExperienceForm
          edit={setedit}
          resumeId={details?.id}
          onSubmit={createExp}

        />
      )}
    </div>
  );
};

export default Experience;
