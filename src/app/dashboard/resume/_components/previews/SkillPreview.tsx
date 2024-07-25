import { Skills } from "@prisma/client";
import { FC, ReactElement } from "react";

interface SkillPreviewProps {
  skills?: Skills[] | null;
}

const SkillPreview: FC<SkillPreviewProps> = ({ skills }): ReactElement => {
  const languages = skills?.filter((skill) => skill.type === "Language");
  const tools = skills?.filter((skill) => skill.type === "Tools");
  const frameworks = skills?.filter((skill) => skill.type === "Framework");

  return (
    <div className=" w-[90%] mx-auto mt-2 ">
      <h1 className=" text-xl ">Technical Skills</h1>
      <div className=" h-[1.7px] bg-slate-900 mb-2" />

      <div className=" mx-2  ">
        {languages && languages.length > 0 && (
          <div>
            <span className=" font-bold text-sm">Languages : </span>
            <span>
              {languages?.map((skill) => (
                <span key={skill.id} className=" text-xs">
                  {skill.name},{" "}
                </span>
              ))}
            </span>
          </div>
        )}

        {frameworks && frameworks.length > 0 && (
          <div>
            <span className=" font-bold text-sm">Frameworks : </span>
            <span>
              {frameworks?.map((skill) => (
                <span key={skill.id} className=" text-xs">
                  {skill.name},{" "}
                </span>
              ))}
            </span>
          </div>
        )}
        {tools && tools.length > 0 && (
          <div>
            <span className=" font-bold text-sm">Tools : </span>
            <span>
              {tools?.map((skill) => (
                <span key={skill.id} className=" text-xs">
                  {skill.name},{" "}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillPreview;
