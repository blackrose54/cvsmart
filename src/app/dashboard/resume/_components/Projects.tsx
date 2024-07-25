"use client";

import { createProject, deleteProject, updateProject } from "@/actions/crudProjects";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
import { useToast } from "@/components/ui/use-toast";
import { ProjectsSchema } from "@/schemas/models.schemas";
import { FC, ReactElement, useState } from "react";
import { z } from "zod";
import ProjectForm from "./forms/projectform";

interface ProjectProps {
  details: ResumeData;
}

const Projects: FC<ProjectProps> = ({ details }): ReactElement => {
  const [edit, setedit] = useState<number | undefined>(
    -1
  );
  const { toast } = useToast();

  async function createExp(values: z.infer<typeof ProjectsSchema>) {
    console.log(values);
    const res = await createProject({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Project Updated",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Project",
      });
  }

  async function updateExp(values: z.infer<typeof ProjectsSchema>) {
    console.log(values);
    const res = await updateProject({
      ...values,
    });
    if (res) {
      toast({
        variant: "success",
        title: "Project Updated",
      });
    } else
      toast({
        variant: "destructive",
        title: "Failed to update Project",
      });
  }

  async function deleteExp(id: number | undefined, resumeId: string) {
    const res = await deleteProject(id, resumeId);
    if (res) {
      toast({
        variant: "success",
        title: "Project Deleted",
      });
      setedit(-1);
    } else
      toast({
        variant: "destructive",
        title: "Failed to delete Project",
      });
  }

  return (
    <div className=" space-y-4 overflow-y-auto">
      {details?.Projects.map((proj) => {
        if (edit == proj.id)
          return (
            <ProjectForm
              edit={setedit}
              onSubmit={updateExp}
              onDelete={deleteExp}
              liveLink={proj.liveLink ?? undefined}
              githubLink={proj.githubLink ?? undefined}
              description={proj.description}
              id={proj.id}
              name={proj.name}
              resumeId={proj.resumeId}
              tags={proj.tags}
              key={proj.id}
            />
          );

        return (
          <div
            key={proj.id}
            onClick={() => setedit(proj.id)}
            className="p-8 border-2 rounded-sm rounded-t-lg border-t-8"
          >
            {proj.name}
          </div>
        );
      })}

      {edit === -1 && (
        <ProjectForm
          edit={setedit}
          resumeId={details?.id}
          onSubmit={createExp}
        />
      )}
    </div>
  );
};

export default Projects;
