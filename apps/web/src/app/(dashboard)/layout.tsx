import { AppSidebar, AppTopbar } from "@/components/app";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
