"use server";

import prisma from "@/lib/db";
import { PositionsSchema } from "@/schemas/models.schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createPosition(data: z.infer<typeof PositionsSchema>) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const resume = await prisma.resume.findUnique({
      where: {
        id: data.resumeId,
        userId: userId,
      },
    });

    if (!resume) return null;

    if (PositionsSchema.safeParse(data).success === false) return null;

    const res = await prisma.positions.create({
      data: {
        // Assuming fields for the position model
        ...data,
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to create position:", error);
  }
}

export async function updatePosition(data: z.infer<typeof PositionsSchema>) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const resume = await prisma.resume.findUnique({
      where: {
        id: data.resumeId,
        userId: userId,
      },
    });

    if (!resume) return null;

    if (PositionsSchema.safeParse(data).success === false) return null;

    const res = await prisma.positions.update({
      where: { id: data.id },
      data: {
        // Assuming fields for the position model
        ...data,
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to update position:", error);
  }
}

export async function deletePosition(
  id: number | undefined,
  resumeId: string
) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId: userId,
      },
    });

    if (!resume) return null;

    const res = await prisma.positions.delete({
      where: {
        id: id,
        // Assuming there's a relation to a resume via resumeId that needs to be checked
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to delete position", error);
  }
}
