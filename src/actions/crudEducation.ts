"use server";

import prisma from "@/lib/db";
import { EducationSchema } from "@/schemas/models.schemas";
import { auth } from "@clerk/nextjs/server";
import exp from "constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createEducation(data: z.infer<typeof EducationSchema>) {
  try {
    const { userId } = auth();
    if (!userId) return;

    if (EducationSchema.safeParse(data).success === false) return null;

    const res = await prisma.education.create({
      data: {
        course: data.course,
        institution_name: data.institution_name,
        location: data.location,
        startdate: data.startdate,
        enddate: data.enddate,
        resumeId: data.resumeId,
        grade: data.grade,
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to update resume:", error);
  }
}

export async function updateEducation(data: z.infer<typeof EducationSchema>) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const resume = await prisma.resume.findUnique({
      where: {
        id: data.resumeId,
        userId,
      },
    });

    if (!resume) return null;

    if (EducationSchema.safeParse(data).success === false) return null;

    const res = await prisma.education.update({
      where: { id: data.id },
      data: {
        course: data.course,
        institution_name: data.institution_name,
        location: data.location,
        startdate: data.startdate,
        enddate: data.enddate,
        grade: data.grade,
      },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to update resume:", error);
  }
}

export async function deleteEducation(id: number|undefined, resumeId: string) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId,
      },
    });

    if (!resume) return null;

    const res = await prisma.education.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/resume", "layout");
    return res;
  } catch (error) {
    console.error("Failed to update resume:", error);
  }
}
