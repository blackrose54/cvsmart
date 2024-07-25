"use server";

import prisma from "@/lib/db";
import { ExperienceSchema } from "@/schemas/models.schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createExperience(data: z.infer<typeof ExperienceSchema>) {
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

    if (ExperienceSchema.safeParse(data).success === false) return null;

    const res = await prisma.experience.create({
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

export async function updateExperience(data: z.infer<typeof ExperienceSchema>) {
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

    if (ExperienceSchema.safeParse(data).success === false) return null;

    const res = await prisma.experience.update({
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

export async function deleteExperience(
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

    const res = await prisma.experience.delete({
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
