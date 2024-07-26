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
import { SkillsSchema } from "@/schemas/models.schemas"; // Assume this schema exists

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SkillFormProps extends Partial<z.infer<typeof SkillsSchema>> {
  edit: Function;
  onSubmit: (values: z.infer<typeof SkillsSchema>) => Promise<any>;
  onDelete?: (id: number | undefined, resumeId: string) => Promise<any>;
}

export default function SkillForm(details: SkillFormProps) {
  const form = useForm<z.infer<typeof SkillsSchema>>({
    resolver: zodResolver(SkillsSchema),
    defaultValues: {
      type: details.type,
      name: details.name,
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
            <h1 className=" text-2xl font-semibold">Skills</h1>
            <p className=" text-muted-foreground">Add your skills</p>
          </div>

          <div className=" flex items-center gap-x-4 justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Python" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type of Skill" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Language">Language</SelectItem>
                      <SelectItem value="Framework">Framework</SelectItem>
                      <SelectItem value="Tools">Developer Tools</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className=" w-full flex justify-between">
            <div className=" flex-col flex gap-y-2 sm:flex-row sm:gap-x-4">
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
