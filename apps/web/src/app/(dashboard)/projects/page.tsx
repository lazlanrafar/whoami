"use client";

import { useGetProjectQuery } from "@/api/event/project";
import CardProject from "@/components/molecules/card-project";
import SkeletonProject from "@/components/molecules/skeleton-project";
import DetailProject from "@/components/organisms/detail-project";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { IProject } from "@/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProjectsPage() {
  const { user } = useStore();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(user?.user_metadata?.preferred_username ?? "");
  }, [user]);

  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetProjectQuery({
    page,
  });

  const [projectId, setProjectId] = useState<string>("");
  const [sheetDetailOpen, setSheetDetailOpen] = useState<boolean>(false);

  return (
    <main>
      <div className="mb-3">
        <h3 className="text-xl mb-2">
          <span className="capitalize">{username}</span>'s Projects
        </h3>
        <p className="text-muted-foreground text-sm">
          Showcase your projects and let people know what you have been working
          on recently.
        </p>
      </div>

      <hr className="border-dashed my-5" />

      <div className="flex">
        <Link href="/projects/form">
          <Button size={"sm"}>Add Project</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-4 gap-4 mt-5">
          <SkeletonProject />
          <SkeletonProject className="hidden sm:block" />
          <SkeletonProject className="hidden sm:block" />
          <SkeletonProject className="hidden sm:block" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-4 mt-5">
          {data?.data?.data.map((project: IProject) => (
            <CardProject
              project={project}
              onClick={() => {
                setProjectId(project.id ?? "");
                setSheetDetailOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <DetailProject
        projectId={projectId}
        open={sheetDetailOpen}
        onOpenChange={() => setSheetDetailOpen(!sheetDetailOpen)}
      />
    </main>
  );
}
