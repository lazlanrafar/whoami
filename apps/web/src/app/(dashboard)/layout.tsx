"use client";
import { AppSidebar, AppTopbar } from "@/components/app";
import { AuthenticatedRoute } from "@/middleware/authenticated-route";
import { useStore } from "@/store";
import supabase from "@/supabase";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onAuthSuccess, onLogout } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        onAuthSuccess({
          accessToken: session.access_token,
          user: session.user,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        onAuthSuccess({
          accessToken: session?.access_token,
          user: session?.user,
        });

        return;
      }

      onLogout();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthenticatedRoute>
      <div className="h-screen max-h-screen w-full overflow-y-auto bg-background-default">
        <div className="flex max-h-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <AppTopbar />
            <main className="flex-1 flex-grow overflow-auto">
              <div className="max-w-7xl p-4">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
