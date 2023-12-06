export default function Home() {
  return (
    <main className="">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Introduction</h2>
        <p className="text-muted-foreground">
          API Provider for your personal website. Built with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="text-blue-500"
          >
            Next.js
          </a>
          .
        </p>
      </div>

      <div className="mt-8">
        <div className="space-y-3">
          <p>
            This is NOT a component library. It's a collection of re-usable
            components that you can copy and paste into your apps.
          </p>

          <p className="italic">
            Use this as a reference to build your own component libraries.
          </p>
        </div>
      </div>
    </main>
  );
}
