import type { Metadata } from "next";

import { Toaster } from "sonner";

import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Whoami",
  description: "a Personal API for your digital identity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} dark`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
