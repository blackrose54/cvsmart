"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  const { userId } = auth();
  if (!userId) return;
  await prisma.resume.delete({
    where: { id, userId },
  });

  revalidatePath('/dashboard','layout');
}
