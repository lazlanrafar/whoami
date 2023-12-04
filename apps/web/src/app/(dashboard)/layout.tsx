"use client";
import { AppSidebar, AppTopbar } from "@/components/app";
import supabase from "@/supabase";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
    });

    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     console.log(event, session);
    //   }
    // );
  }, []);

  return (
    <div className="h-screen max-h-screen w-full overflow-y-auto bg-background-default">
      <div className="flex max-h-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppTopbar />
          <main className="overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
