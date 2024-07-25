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
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AddResume() {
  const [title, settitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    if (title.length < 3) {
      return;
    }

    try {
      const id = await createResume(title);
      if (id) {
        router.push(`/dashboard/resume/${id}/edit`);
        toast({
          description: "Resume Created Successfully",
          variant: "success",
        })
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Resume</DialogTitle>
          <DialogDescription className="py-2">
            <form className=" space-y-6" onSubmit={onSubmit}>
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
