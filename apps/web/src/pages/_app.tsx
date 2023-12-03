import type { AppProps } from "next/app";
import { AppSidebar, AppTopbar } from "../components/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
