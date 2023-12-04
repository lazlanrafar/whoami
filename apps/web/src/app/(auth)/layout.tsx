export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen max-h-screen w-full flex items-center justify-center">
      <main className="max-w-[400px] w-full">{children}</main>
    </div>
  );
}
