"use client";

import { useGetProjectQuery } from "@/api/event/project";
import { Button } from "@/components/ui/button";
import { whoAmiAsset } from "@/lib/utils";
import { useStore } from "@/store";
import { IProject } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const { user } = useStore();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(user?.user_metadata?.preferred_username ?? "");
  }, [user]);

  const { data, isLoading } = useGetProjectQuery();
  console.log(data);

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
        <span>Loading...</span>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-5">
          {data?.data?.data.map((project: IProject) => (
            <div key={project.id} className="border  rounded-lg p-3">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {project.thumbnail ? (
                    <img
                      src={whoAmiAsset(project.thumbnail)}
                      alt={project.title}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    ""
                  )}
                  <div>
                    <h4 className="text-sm font-semibold">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
