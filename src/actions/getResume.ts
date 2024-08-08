'use server'

import prisma from "@/lib/db";

export async function getResume(id: string) {
  const res = await prisma.resume.findUnique({
    where: {
      id,
    },
    include: {
      AcademicAchievements: true,
      Education: true,
      Experience: true,
      ExtraCarricular: true,
      Projects: true,
      Skills: true,
      Positions:true
    },
  });

  return res;
}
