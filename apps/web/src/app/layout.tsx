import type { Metadata } from "next";
import { AppSidebar, AppTopbar } from "@/components/app";

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
      <body className={fontSans.className}>
        <div className="h-screen max-h-screen w-full overflow-y-auto bg-background-default">
          <div className="flex max-h-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <AppTopbar />
              <main className="overflow-auto">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
