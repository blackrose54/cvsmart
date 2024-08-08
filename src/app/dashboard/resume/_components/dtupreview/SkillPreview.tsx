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
    <div className=" w-[90%] mx-auto space-y-2 ">
      <h1 className=" bg-slate-200 font-semibold px-2 border-[1px] uppercase ">
        Technical Skills
      </h1>

      <table className=" w-full">
        <tr>
            {languages && languages.length > 0 && (
          <td className="w-1/3 pl-2">
              <div>
                <span>
                  {languages?.map((skill) => (
                    <span key={skill.id} className=" text-xs">
                      {skill.name},{" "}
                    </span>
                  ))}
                </span>
              </div>
          </td>
            )}
            {frameworks && frameworks.length > 0 && (
          <td className="w-1/3 pl-2">
              <div>
                <span>
                  {frameworks?.map((skill) => (
                    <span key={skill.id} className=" text-xs">
                      {skill.name},{" "}
                    </span>
                  ))}
                </span>
              </div>
          </td>
            )}
            {tools && tools.length > 0 && (
          <td className="w-1/3 pl-2">
              <div>
                <span>
                  {tools?.map((skill) => (
                    <span key={skill.id} className=" text-xs">
                      {skill.name},{" "}
                    </span>
                  ))}
                </span>
              </div>
          </td>
            )}
        </tr>
      </table>
    </div>
  );
};

export default SkillPreview;
