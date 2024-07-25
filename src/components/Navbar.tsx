import React from "react";
import { ThemeToggle } from "./theme-toggle-button";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav
      className=" flex items-center px-4 py-4 border-b-2 justify-between"
      id="no-print"
    >
      <Link href={"/"} className=" flex items-center gap-x-2">
        <Image
          src={"/assets/image/logo.svg"}
          alt="logo"
          height={40}
          width={40}
          className=" object-contain rounded-full"
        />
        <p className=" font-semibold text-xl">CVSmart</p>
      </Link>
      <div className=" flex justify-between items-center gap-x-4">
        <ThemeToggle />

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "2.5rem",
                  height: "2.5rem",
                },
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
