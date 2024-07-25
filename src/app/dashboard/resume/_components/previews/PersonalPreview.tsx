import Link from "next/link";
import React from "react";

interface PersonalPreviewProps {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
}
export default function PersonalPreview({
  first_name,
  last_name,
  phone,
  email,
  linkedin,
  github,
}: PersonalPreviewProps) {
  if (!first_name || !last_name) {
    return <div className=" min-h-28"></div>;
  }
  return (
    <div className=" text-center min-h-28 flex items-center justify-center ">
      <div className="space-y-2">
        <h1 className=" text-4xl font-bold capitalize">
          {first_name} {last_name}
        </h1>
        <p className=" text-sm ">
          {phone} {email && ` | ${email}`}{" "}
          {linkedin && (<>
            <span> | </span>
            <Link target="_blank" href={linkedin} className=" underline underline-offset-2">
              LinkedIn
            </Link>
            </>
          )}{" "}
          {github && (<>
            <span> | </span>
            <Link target="_blank" href={github}>
              Github
            </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
