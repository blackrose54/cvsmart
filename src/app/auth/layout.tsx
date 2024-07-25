import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className=" py-16  flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
