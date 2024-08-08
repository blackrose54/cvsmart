import Link from "next/link";
import React from "react";

interface PersonalPreviewProps {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
  rollNo?: string | null;
}
export default function PersonalPreview({
  first_name,
  last_name,
  phone,
  email,
  linkedin,
  github,
  rollNo
}: PersonalPreviewProps) {
  if (!first_name || !last_name) {
    return <div className=" min-h-28"></div>;
  }
  return (
    <div className=" space-y-4  mt-8  ">
      <h1 className=" text-2xl text-center font-bold capitalize  ">
        {first_name} {last_name}
      </h1>
      <div className=" text-sm px-8 flex items-center justify-between">
        <div className=" ">
          <p>{phone}</p>
          <p>{rollNo}</p>
        </div>
        <div>
          <p>{email}</p>
            {github && <><Link href={github}>Github</Link> | </>}
            {linkedin && <Link href={linkedin}>LinkedIn</Link>}
        </div>
      </div>
    </div>
  );
}
