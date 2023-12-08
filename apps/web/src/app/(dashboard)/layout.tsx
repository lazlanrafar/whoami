"use client";
import { AppFooter, AppSidebar, AppTopbar } from "@/components/app";
import { AuthenticatedRoute } from "@/components/guard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatedRoute>
      <div className="h-screen max-h-screen w-full overflow-y-auto bg-background-default">
        <div className="flex max-h-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <AppTopbar />
            <main className="flex flex-col flex-1 flex-grow overflow-auto h-full">
              <div className="max-w-7xl p-5 sm:p-10">{children}</div>
              <AppFooter />
            </main>
          </div>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
