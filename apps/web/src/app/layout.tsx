import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/atoms/provider-theme";
import ReactQueryProvider from "@/components/atoms/provider-react-query";

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
      <body className={`${fontSans.className} h-screen overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
