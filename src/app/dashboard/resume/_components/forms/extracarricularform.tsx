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
import { ExtraCarricularSchema } from "@/schemas/models.schemas"; // Assume this schema exists

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

import { useForm } from "react-hook-form";
import { z } from "zod";

interface achievementFormProps
  extends Partial<z.infer<typeof ExtraCarricularSchema>> {
  edit: Function;
  onSubmit: (
    values: z.infer<typeof ExtraCarricularSchema>
  ) => Promise<any>;
  onDelete?: (id: number | undefined, resumeId: string) => Promise<any>;
}

export default function ExtracarricularForm(details: achievementFormProps) {
  const form = useForm<z.infer<typeof ExtraCarricularSchema>>({
    resolver: zodResolver(ExtraCarricularSchema),
    defaultValues: {
      activity: details.activity,
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
            <h1 className=" text-2xl font-semibold">
              Extra-Carricular and Awards
            </h1>
            <p className=" text-muted-foreground">Add your extra-carricular activites</p>
          </div>

          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Activity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Member of XYZ sports team for College / resident & won X medal in X tournament, year X"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
