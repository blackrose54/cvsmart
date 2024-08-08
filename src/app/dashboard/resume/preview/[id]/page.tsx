"use client";

import { getResume } from "@/actions/getResume";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { Button } from "@/components/ui/button";
import { FC, ReactElement, useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import PreviewJake from "../../_components/previews/Preview";
import PreviewDTU from "../../_components/dtupreview/Preview";

interface pageProps {
  params:{id:string}
}

const Page: FC<pageProps> = ({params:{id}}): ReactElement => {
  const [data,setdata] = useState<ResumeData|null>(null)
  const [href,sethref] = useState<string>("")

  useEffect(()=>{
    getResume(id).then(res=>setdata(res))
    sethref(window.location.href)
  },[])
  return (
    <>
      <main className=" container mx-auto p-4 space-y-8" id="no-print">
        <div
          className=" flex justify-center w-full gap-x-10 sm:gap-x-60"
          id="no-print"
        >
          <Button
            onClick={async () => {
              window.print();
            }}
          >
            Download
          </Button>
          <RWebShare
          sites={["facebook", "twitter", "linkedin", "whatsapp","telegram"]}
            data={{
              text: "My Resume",
              url: href,
              title: data?.first_name + " " + data?.last_name + " Resume",

            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button>Share 🔗</Button>
          </RWebShare>
        </div>
      </main>
      <div className=" shadow-lg border-2 w-fit mx-auto mb-4">
        
        <div className=" h-[1123px] w-[794px] mx-auto" id="print-area">
          {data?.template == 'Jakes' ? <PreviewJake resumeInfo={data} />:<PreviewDTU resumeInfo={data} />}
        </div>
      </div>
    </>
  );
};

export default Page;
