"use client";

import { createResume } from "@/actions/createResume";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Template } from "@prisma/client";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AddResume() {
  const [title, settitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [template, settemplate] = useState<Template>("Jakes");

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    if (title.length < 3) {
      setloading(false);
      return;
    }

    try {
      const id = await createResume(title,template);
      if (id) {
        router.push(`/dashboard/resume/${id}/edit`);
        toast({
          description: "Resume Created Successfully",
          variant: "success",
        });
      } else
        toast({
          description: "Something went wrong while creating Resume",
          variant: "destructive",
        });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (title.length < 3) seterror("Title must be at least 3 characters long");
    else seterror("");
  }, [title]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className=" min-h-[25rem] rounded-lg p-2 min-w-16 border-dotted border-2 border-primary/50 cursor-pointer hover:scale-105 hover:shadow-lg transition-all ease-in-out bg-secondary flex items-center justify-center">
          <PlusCircleIcon className=" text-muted-foreground" size={40} />
        </div>
      </DialogTrigger>
      <DialogContent className=" md:min-w-[45rem] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create a new Resume</DialogTitle>
          <DialogDescription className="py-2">
            <form className=" space-y-6 " onSubmit={onSubmit}>
              <p className=" text-muted-foreground">
                Add Title for your new Resume
              </p>
              <div className=" space-y-2">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
                <p className=" text-xs text-red-600">{error}</p>
              </div>

              <div className=" space-y-4">
                <h1>Select Resume Template</h1>

                <div className="w-full grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 gap-4 ">
                  <div  onClick={()=>settemplate('Jakes')} className={` h-32 md:min-h-[20rem] w-auto rounded-md border-2 cursor-pointer flex flex-col items-center justify-between ${template == "Jakes" ?"ring-4 ring-primary":""} `}>
                    <div className=" relative aspect-video h-full w-full">
                      <Image
                        src={"/assets/image/jakesPreview.png"}
                        alt="jakes"
                        fill
                        className=" object-cover"
                      />
                    </div>
                    <p className=" p-2 border-t-2 w-full">Jake&apos;s Resume Template</p>
                  </div>
                  <div onClick={()=>settemplate('DTU')} className={`h-32 md:min-h-[20rem] w-auto rounded-md border-2 cursor-pointer flex flex-col items-center justify-between ${template == 'DTU' ? "ring-4 ring-primary":""}`}>

                     <div className=" relative aspect-video h-full w-full">
                      <Image
                        src={"/assets/image/dtuPreview.png"}
                        alt="jakes"
                        fill
                        className=" object-cover"
                      />
                    </div>
                    <p className=" p-2 border-t-2 w-full">DTU Template</p>
                  </div>
                </div>
              </div>
              <div className=" flex items-center gap-x-6 justify-end ">
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Create
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
