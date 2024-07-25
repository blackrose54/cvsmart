"use server";

import prisma from "@/lib/db";
import { ResmueSchema } from "@/schemas/models.schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateResume(data: z.infer<typeof ResmueSchema>) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const res = await prisma.resume.update({
      where: {
        id: data.id,
        userId,
      },
      data,
    });

    revalidatePath('/dashboard/resume','layout');
    return res;
  } catch (error) {
    console.error("Failed to update resume:", error);
  }
}
