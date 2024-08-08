"use client";

import { useResumeInfo } from "@/app/dashboard/_components/ResumeInfo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, HomeIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";
import Achievement from "../../_components/Achievements";
import Education from "../../_components/Education";
import Experience from "../../_components/Experience";
import ExtraCarricular from "../../_components/Extracarricular";
import PersonalDetails from "../../_components/forms/personalform";
import Positions from "../../_components/Position";
import PreviewJake from "../../_components/previews/Preview";
import Projects from "../../_components/Projects";
import Skills from "../../_components/Skills";
import PreviewDTU from "../../_components/dtupreview/Preview";

interface pageProps {}

const Page: FC<pageProps> = (): ReactElement => {
  const data = useResumeInfo();

  const id = data?.id;

  const formseq = [
    "personal",
    "education",
    "experience",
    "projects",
    "skills",
    "achievements",
    "extracarricular",
    "position",
  ];

  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(0);

  useEffect(() => {
    if (currentForm > formseq.length - 1) {
      setCurrentForm(0);
      router.push(`/dashboard/resume/preview/${id}`);
    }
  }, [currentForm, formseq.length, id, router]);

  return (
    <main className=" grid md:grid-cols-2 h-screen grid-cols-1 grid-flow-row gap-4 border-border p-8">
      <div className=" h-full space-y-6 pb-4">
        <div className=" flex items-center justify-between gap-x-4">
          <div className=" space-x-4 flex items-center">
            <Link href={"/dashboard"}>
              <Button size={"icon"}>
                <HomeIcon />
              </Button>
            </Link>
            <Button
              variant={"outline"}
              onClick={() =>
                setCurrentForm((prev) => (prev === 0 ? 0 : prev - 1))
              }
            >
              <ArrowLeft size={20} />
              <p>Back</p>
            </Button>
          </div>
          <div className=" space-x-4">
            <Link href={`/dashboard/resume/preview/${id}`}>
              <Button variant={'ghost'}>Preview</Button>
            </Link>
            <Button
              className=" space-x-2"
              onClick={() => setCurrentForm((prev) => prev + 1)}
              disabled={currentForm > formseq.length - 1}
            >
              {currentForm <= formseq.length - 1 ? (
                <>
                  {" "}
                  <p>Next</p>
                  <ArrowRight size={20} />
                </>
              ) : (
                <Loader2 size={20} className=" animate-spin" />
              )}
            </Button>
          </div>
        </div>
        <div className="">
          {formseq[currentForm] === "personal" && (
            <PersonalDetails details={data} />
          )}
          {formseq[currentForm] === "education" && <Education details={data} />}
          {formseq[currentForm] === "experience" && (
            <Experience details={data} />
          )}
          {formseq[currentForm] === "projects" && <Projects details={data} />}
          {formseq[currentForm] === "skills" && <Skills details={data} />}
          {formseq[currentForm] === "achievements" && (
            <Achievement details={data} />
          )}
          {formseq[currentForm] === "extracarricular" && (
            <ExtraCarricular details={data} />
          )}

          {data?.template == 'DTU' && formseq[currentForm] === "position" && <Positions details={data} />}
        </div>
      </div>
      <div className=" h-full border-2 rounded-md ">
        {data?.template == 'Jakes' ? <PreviewJake resumeInfo={data} />:<PreviewDTU resumeInfo={data} />}
      </div>
    </main>
  );
};

export default Page;
