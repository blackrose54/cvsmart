"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteResume } from "@/actions/deleteResume";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Resume } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { getRandomGradient } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteor";

export default function ResumeComp({ resume }: { resume: Resume }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const gradient = getRandomGradient();
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteResume(resume.id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="shadow-xl relative bg-gray-900 min-h-[25rem] cursor-pointer flex justify-end rounded-lg flex-col overflow-clip ">
      <Meteors number={40} />

        <p className="  bg-slate-700 text-slate-200 w-full p-6 flex justify-between">
          {resume.title}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <Link
                  className="w-full"
                  href={`/dashboard/resume/${resume.id}/edit`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="w-full"
                  href={`/dashboard/resume/preview/${resume.id}`}
                >
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="w-full"
                  href={`/dashboard/resume/preview/${resume.id}`}
                >
                  Download
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className=" cursor-pointer "
                onClick={() => setIsOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      </div>
    </div>
  );
}
