'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClerkContextProvider({children}:{children:React.ReactNode}) {
    const {resolvedTheme} = useTheme()
  return (
    <ClerkProvider appearance={{baseTheme:resolvedTheme === 'dark' ? dark: experimental__simple }}>
      {children}
    </ClerkProvider>
  )
}