"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectsSchema } from "@/schemas/models.schemas"; // Assume this schema exists

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProjectFormProps extends Partial<z.infer<typeof ProjectsSchema>> {
  edit: Function;
  onSubmit: (values: z.infer<typeof ProjectsSchema>) => Promise<any>;
  onDelete?: (id: number | undefined, resumeId: string) => Promise<any>;
}

export default function ProjectForm(details: ProjectFormProps) {
  const form = useForm<z.infer<typeof ProjectsSchema>>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: {
      name: details.name,
      description: details.description,
      tags: details.tags,
      resumeId: details.resumeId,
      id: details.id,
    },
  });

  return (
    <div className="p-8 border-2 rounded-sm rounded-t-lg border-t-8 border-t-primary">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(details.onSubmit, (err) =>
            console.log(err)
          )}
          className="space-y-4"
        >
          <div className=" mb-8">
            <h1 className=" text-2xl font-semibold">Projects</h1>
            <p className=" text-muted-foreground">Add your projects</p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Gitlytics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Python, Flask, React, PostgreSQL, Docker"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex items-center justify-between gap-x-8">
            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="liveLink"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Live Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <EditorProvider>
                    <Editor
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <Separator />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                      </Toolbar>
                    </Editor>
                  </EditorProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" w-full flex justify-between">
            <div className=" space-x-4">
              <Button className=" space-x-2" onClick={() => details.edit(-1)}>
                <Plus size={20} />
                <p>Add</p>
              </Button>
              <Button
                className=" space-x-2"
                type="button"
                onClick={async () => {
                  if (details.onDelete)
                    await details.onDelete(details.id, details.resumeId || "");
                }}
              >
                <Minus size={20} />
                <p>Remove</p>
              </Button>
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
