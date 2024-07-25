
import React from "react";
import AddResume from "./_components/AddResume";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MoreVertical } from "lucide-react";
import ResumeComp from "./_components/Resume";


export default async function Dashboard() {
  const { userId } = auth();
  if (!userId)
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/auth/sign-in");

  const myresumes = await prisma.resume.findMany({
    where: {
      userId,
    },
  });

  return (
    <main className=" py-16 container space-y-8">
      <div className=" space-y-4">
        <h1 className=" font-bold text-4xl md:text-6xl">My Resume</h1>
        <p className=" text-muted-foreground">
          Start & Explore AI Resume builder, Create Resume with AI
        </p>
      </div>

      <div className=" grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        <AddResume />
        {myresumes.map((resume) => {
          return (
            <ResumeComp key={resume.id} resume={resume} />
          );
        })}
      </div>
      
    </main>
  );
}
