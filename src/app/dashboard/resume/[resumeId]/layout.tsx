import React from "react";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ResumeInfoProvider } from "@/app/dashboard/_components/ResumeInfo";

export default async function ResumeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { resumeId: string};
}) {
  const { userId } = auth();
  if (!userId)
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/auth/sign-in");

  if(!params) redirect("/dashboard");

  const resumeInfo = await prisma.resume.findUnique({
    where: {
      userId,
      id: params.resumeId,
    },
    include: {
      AcademicAchievements: true,
      Education: true,
      Experience: true,
      Projects: true,
      Skills: true,
      ExtraCarricular: true,
    },
  });

  if(!resumeInfo) redirect("/dashboard");

  return <ResumeInfoProvider value={resumeInfo}>{children}</ResumeInfoProvider>;
}
