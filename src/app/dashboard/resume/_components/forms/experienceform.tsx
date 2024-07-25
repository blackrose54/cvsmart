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
import { cn } from "@/lib/utils";
import { ExperienceSchema } from "@/schemas/models.schemas"; // Assume this schema exists

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import DatePicker from "react-datepicker";
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

interface EducationFormProps extends Partial<z.infer<typeof ExperienceSchema>> {
  edit: Function;
  onSubmit: (values: z.infer<typeof ExperienceSchema>) => Promise<any>;
  onDelete?: (id: number | undefined, resumeId: string) => Promise<any>;
}

export default function ExperienceForm(details: EducationFormProps) {
  const form = useForm<z.infer<typeof ExperienceSchema>>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      city: details.city,
      company_name: details.company_name,
      endDate: details.endDate,
      id: details.id,
      position_title: details.position_title,
      resumeId: details.resumeId,
      startDate: details.startDate,
      summary: details.summary,
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
            <h1 className=" text-2xl font-semibold">Experience</h1>
            <p className=" text-muted-foreground">
              Add your educational details
            </p>
          </div>
          <FormField
            control={form.control}
            name="position_title"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Undergraduate Research Assistant "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Texas A&M University" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="College Station, TX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" flex items-center justify-between">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className=" w-full block">Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      selected={field.value}
                      onChange={field.onChange}
                      customInput={
                        <Button
                          variant={"outline"}
                          type="button"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "LLL yyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className=" w-full block">End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      selected={field.value}
                      onChange={field.onChange}
                      customInput={
                        <Button
                          variant={"outline"}
                          type="button"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "LLL yyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Summary</FormLabel>
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
