"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Template } from "@prisma/client";

export async function createResume(title: string,template:Template) {
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
        template
      },
    });

    return res.id;
  } catch (error) {
    console.log("Error in createResume", error);
    return null;
  }
}
