"use server";

import prisma from "@/lib/db";
import { AcademicAchievementsSchema } from "@/schemas/models.schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createAchievement(data: z.infer<typeof AcademicAchievementsSchema>) {
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

    if (AcademicAchievementsSchema.safeParse(data).success === false) return null;

    const res = await prisma.academicAchievements.create({
      data: {
        // Assuming fields for the Experience model
        ...data,
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to create experience:", error);
  }
}

export async function updateAchievement(data: z.infer<typeof AcademicAchievementsSchema>) {
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

    if (AcademicAchievementsSchema.safeParse(data).success === false) return null;

    const res = await prisma.academicAchievements.update({
      where: { id: data.id },
      data: {
        // Assuming fields for the Experience model
        ...data,
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to update experience:", error);
  }
}

export async function deleteAchievement(
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

    const res = await prisma.academicAchievements.delete({
      where: {
        id: id,
        // Assuming there's a relation to a resume via resumeId that needs to be checked
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to delete experience:", error);
  }
}
