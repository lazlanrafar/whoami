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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, ex et. Doloremque, eaque. Magnam, obcaecati sequi.
            Suscipit rem omnis, quae esse impedit vitae. Eveniet harum vero iste
            quos recusandae distinctio!
          </p>

          <p className="italic">
            Use this as a resource to build your own personal website.
          </p>
        </div>
      </div>
    </main>
  );
}
