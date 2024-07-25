import { ThemeToggle } from "@/components/theme-toggle-button";
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" space-x-4">
      <Link href={'/dashboard'}>dashboard</Link>
      <Link href={'/auth/sign-in'}>SignIn</Link>
      <Link href={'/auth/sign-up'}>SignUp</Link>
    </div>
  );
}
