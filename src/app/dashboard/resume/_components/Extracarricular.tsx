"use client";

import {
  createExtraCarricular,
  deleteExtraCarricular,
  updateExtraCarricular,
} from "@/actions/crudExtracarricular";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { ExtraCarricularSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import ExtracarricularForm from "./forms/extracarricularform";

interface AchievementProps {
  details: ResumeData;
}

const ExtraCarricular: FC<AchievementProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number | undefined>(-1);
  const { toast } = useToast();

  async function createSk(values: z.infer<typeof ExtraCarricularSchema>) {
    console.log(values);
    const res = await createExtraCarricular({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Extracarricular Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Extracarricular",
      });
  }

  async function updateSk(values: z.infer<typeof ExtraCarricularSchema>) {
    console.log(values);
    const res = await updateExtraCarricular({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Extracarricular Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Extracarricular",
      });
  }

  async function deleteSk(id: number | undefined, resumeId: string) {
    const res = await deleteExtraCarricular(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Extracarricular Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Extracarricular",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.ExtraCarricular.map((achievement) => {
        if (edit == achievement.id)
          return (
            <ExtracarricularForm
              edit={setedit}
              onSubmit={updateSk}
              onDelete={deleteSk}
              {...achievement}
              key={achievement.id}
            />
          );

        return (
          <div
            key={achievement.id}
            onClick={() => setedit(achievement.id)}
            className="p-8 border-2 rounded-sm rounded-t-lg border-t-8"
          >
            {achievement.activity}
          </div>
        );
      })}

      {edit === -1 && (
        <ExtracarricularForm
          edit={setedit}
          resumeId={details?.id}
          onSubmit={createSk}
        />
      )}
    </div>
  );
};

export default ExtraCarricular;
