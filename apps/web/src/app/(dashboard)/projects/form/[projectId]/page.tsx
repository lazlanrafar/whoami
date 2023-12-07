"use client";

import FormProject from "@/components/organisms/form-project";
import { useParams } from "next/navigation";

export default function ProjectsPage() {
  const { projectId } = useParams();

  return (
    <main className="max-w-xl">
      <div className="mb-3">
        <h3 className="text-xl mb-2">Update Projects</h3>
        <p className="text-muted-foreground text-sm">
          Showcase your projects and let people know what you have been working
          on recently.
        </p>
      </div>

      <hr className="border-dashed my-5" />

      <FormProject projectId={projectId as string} />
    </main>
  );
}
