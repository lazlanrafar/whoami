import type { AppProps } from "next/app";
import { AppSidebar, AppTopbar } from "~/components/app";

import { Inter as FontSans } from "next/font/google";
import "~/styles/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${fontSans.variable}`}>
      <div className="h-screen max-h-screen w-full overflow-y-auto bg-background-default">
        <div className="flex max-h-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <AppTopbar />
            <main className="overflow-auto">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
