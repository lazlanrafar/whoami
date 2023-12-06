"use client";
import { AppSidebar, AppTopbar } from "@/components/app";
import { AuthenticatedRoute } from "@/middleware/authenticated-route";

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
            <main className="flex-1 flex-grow overflow-auto">
              <div className="max-w-7xl p-5 sm:p-10">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
