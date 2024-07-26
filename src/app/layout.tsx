import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClerkContextProvider from "@/providers/clerk-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CVSmart",
  description: "Resume Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkContextProvider>
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
          </ClerkContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
