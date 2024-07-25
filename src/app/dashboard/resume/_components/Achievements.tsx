"use client";

import {
  createAchievement,
  deleteAchievement,
  updateAchievement,
} from "@/actions/crudAchievement";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { AcademicAchievementsSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import AchievementForm from "./forms/achievementform";

interface AchievementProps {
  details: ResumeData;
}

const Achievement: FC<AchievementProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number>(-1);
  const { toast } = useToast();

  async function createSk(values: z.infer<typeof AcademicAchievementsSchema>) {
    console.log(values);
    const res = await createAchievement({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Achievement Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Achievement",
      });
  }

  async function updateSk(values: z.infer<typeof AcademicAchievementsSchema>) {
    console.log(values);
    const res = await updateAchievement({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Achievement Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Achievement",
      });
  }

  async function deleteSk(id: number | undefined, resumeId: string) {
    const res = await deleteAchievement(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Achievement Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Achievement",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.AcademicAchievements.map((achievement) => {
        if (edit == achievement.id)
          return (
            <AchievementForm
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
            {achievement.achivement}
          </div>
        );
      })}

      {edit === -1 && (
        <AchievementForm
          edit={setedit}
          resumeId={details?.id}
          onSubmit={createSk}
        />
      )}
    </div>
  );
};

export default Achievement;
