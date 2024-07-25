import { Projects } from "@prisma/client";
import Link from "next/link";
import { FC, ReactElement } from "react";

interface ProjectPreviewProps {
  proj?: Projects[] | null;
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ proj }): ReactElement => {
  return (
    <div className=" w-[90%] mx-auto ">
      <h1 className=" text-xl ">Projects</h1>
      <div className=" h-[1.7px] bg-slate-900 mb-2" />

      <div className=" mx-2 ">
        {proj?.map((project) => {
          return (
            <div key={project.id}>
              <div className=" flex items-center justify-between">
                <div>
                  <span className=" flex items-center gap-x-2">
                    <h2 className=" font-bold">{project.name}</h2>
                    {project.githubLink && (
                      <>
                        <div className=" h-4 w-[1.7px] bg-slate-500" />
                        <Link className=" text-xs italic text-sky-600 underline" target="_blank" href={project.githubLink}>Github</Link>
                      </>
                    )}

                    {project.liveLink && (
                      <>
                        <div className=" h-4 w-[1.7px] bg-slate-500" />
                        <Link className=" text-xs italic text-sky-600 underline" target="_blank" href={project.liveLink}>Live</Link>
                      </>
                    )}
                  </span>
                  <p className=" text-sm italic">{project.tags}</p>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: project.description }}
                className="rsw-ce text-xs"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPreview;
