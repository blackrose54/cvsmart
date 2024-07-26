import { ThemeToggle } from "@/components/theme-toggle-button";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const words = [
  {
    text: "Build",
  },
  {
    text: "your",
  },

  {
    text: "Resume",
  },
  {
    text: "in",
  },

  {
    text: "Minutes",
  },
  {
    text: "CVSmart.",
    className: "text-primary",
  },
];

export default function Home() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg space-y-8">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <Image
        src={"/assets/image/logo.svg"}
        alt="logo"
        height={200}
        width={200}
        className=" z-20"
      />
      <h1
        className={cn("md:text-6xl text-xl font-bold text-white relative z-20")}
      >
        CVSmart
      </h1>
      <TypewriterEffectSmooth words={words} className=" z-20" />
      <div className=" space-x-4 z-20 flex items-center">
        <Button>
          <Link href={"/dashboard"}>Get Started</Link>
        </Button>
        <Button>
          <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_UR||"/auth/sign-in"}>Login</Link>
        </Button>
      </div>
    </div>
  );
}
