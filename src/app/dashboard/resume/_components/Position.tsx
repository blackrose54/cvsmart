"use client";

import {
  createPosition,
  deletePosition,
  updatePosition,
} from "@/actions/crudPositions";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { PositionsSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import PositionForm from "./forms/positionform";

interface PositionsProps {
  details: ResumeData;
}

const Positions: FC<PositionsProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number|undefined>(-1);
  const { toast } = useToast();

  async function createExp(values: z.infer<typeof PositionsSchema>) {
    console.log(values);
    const res = await createPosition({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Positions Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Positions",
      });
  }

  async function updateExp(values: z.infer<typeof PositionsSchema>) {
    // console.log(values);
    const res = await updatePosition({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Positions Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Positions",
      });
  }

  async function deleteExp(id: number | undefined, resumeId: string) {
    const res = await deletePosition(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Positions Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Positions",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.Positions.map((pos) => {
        if (edit == pos.id)
          return (
            <PositionForm
              description={pos.description ?? undefined}
              position={pos.position}
              resumeId={pos.resumeId} 
              edit={setedit}
              onSubmit={updateExp}
              onDelete={deleteExp}
              key={pos.id}
            />
          );

        return (
          <div
            key={pos.id}
            onClick={() => setedit(pos.id)}
            className="p-8 border-2 rounded-sm rounded-t-lg border-t-8"
          >
            {pos.position}
          </div>
        );
      })}

      {edit === -1 && (
        <PositionForm
          edit={setedit}
          resumeId={details?.id}
          onSubmit={createExp}

        />
      )}
    </div>
  );
};

export default Positions;
