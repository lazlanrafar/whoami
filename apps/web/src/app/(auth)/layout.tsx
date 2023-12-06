import { GuestRoute } from "@/components/guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestRoute>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <h1 className="font-medium font-mono select-none">Whoami.</h1>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Most good programmers do programming not because they
                expect to get paid or get adulation by the public, but because
                it is fun to program.&rdquo;
              </p>
              <footer className="text-sm">Linus Torvalds</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </GuestRoute>
  );
}
