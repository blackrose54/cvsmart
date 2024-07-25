"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function createResume(title: string) {
  const { userId } = auth();
  if (!userId) return null;

  try {
    if (title.length < 3) {
      return null;
    }

    const res = await prisma.resume.create({
      data: {
        title,
        userId,
      },
    });

    return res.id;
  } catch (error) {
    console.log("Error in createResume", error);
    return null;
  }
}
