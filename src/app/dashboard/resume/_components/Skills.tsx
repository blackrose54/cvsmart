"use client";

import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { SkillsSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import SkillForm from "./forms/skillform";
import { createSkill, deleteSkill, updateSkill } from "@/actions/crudSkills";

interface SkillProps {
  details: ResumeData;
}

const Skills: FC<SkillProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number | undefined>(-1);
  const { toast } = useToast();

  async function createSk(values: z.infer<typeof SkillsSchema>) {
    console.log(values);
    const res = await createSkill({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Skill Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Skill",
      });
  }

  async function updateSk(values: z.infer<typeof SkillsSchema>) {
    console.log(values);
    const res = await updateSkill({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Skill Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Skill",
      });
  }

  async function deleteSk(id: number | undefined, resumeId: string) {
    const res = await deleteSkill(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Skill Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Skill",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.Skills.map((skill) => {
        if (edit == skill.id)
          return (
            <SkillForm
              edit={setedit}
              onSubmit={updateSk}
              onDelete={deleteSk}
              name={skill.name}
              type={skill.type}
              resumeId={details?.id}
              id={skill.id}
              key={skill.id}
            />
          );

        return (
          <div
            key={skill.id}
            onClick={() => setedit(skill.id)}
            className="p-8 border-2 rounded-sm rounded-t-lg border-t-8"
          >
            {skill.name}
          </div>
        );
      })}

      {edit === -1 && (
        <SkillForm edit={setedit} resumeId={details?.id} onSubmit={createSk} />
      )}
    </div>
  );
};

export default Skills;
