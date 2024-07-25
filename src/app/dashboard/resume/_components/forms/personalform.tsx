"use client";

import { updateResume } from "@/actions/updateResume";
import { ResumeData } from "@/app/dashboard/_components/ResumeInfo";
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
import { useToast } from "@/components/ui/use-toast";
import { ResmueSchema } from "@/schemas/models.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PersonalDetails({details}:{details:ResumeData}) {
  const form = useForm<z.infer<typeof ResmueSchema>>({
    resolver: zodResolver(ResmueSchema),
    defaultValues:{
      id:details?.id ?? "",
      first_name: details?.first_name ?? "",
      last_name: details?.last_name ?? "",
      email: details?.email ?? "",
      phone: details?.phone ?? "",
      address: details?.address ?? "",
      jobtitle: details?.jobtitle ?? "",
      summary: details?.summary ?? "",
      github: details?.github ?? "", 
      linkedin:details?.linkedin ?? ""
    }
  });

  const {toast} = useToast()

  async function onSubmit(values: z.infer<typeof ResmueSchema>) {
    const res = await updateResume(values);
    if(res) toast({
      variant:"success",
      title:"Resume Updated"
    })

    else toast({
      variant:"destructive",
      title:"Failed to update Resume"
    })
  }
  return (
    <div className="p-8 border-2 rounded-sm rounded-t-lg border-t-8 border-t-primary">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className=" mb-8">
          <h1 className=" text-2xl font-semibold">Personal Details</h1>
          <p className=" text-muted-foreground">
            Get started with basic information
          </p>
        </div>
        <div className=" flex items-center gap-x-8 ">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jake" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ryan" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="jobtitle"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Full Stack Fronted Developer" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex items-center gap-x-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jake@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+91 1234567890" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" flex items-center gap-x-8">
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.github.com/jakeresume"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="http://linkedin.com/in/jakeresume"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" w-full flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
    </div>

  );
}
