"use client";

import { useGetProjectQuery } from "@/api/event/project";
import CardProject from "@/components/molecules/card-project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { whoAmiAsset } from "@/lib/utils";
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

  const { data, isLoading } = useGetProjectQuery();

  const sheetRef = useRef<HTMLButtonElement>(null);

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
        <div className="grid grid-cols-4 gap-4 mt-5">
          {data?.data?.data.map((project: IProject) => (
            <CardProject
              project={project}
              onClick={() => {
                sheetRef.current?.click();
              }}
            />
          ))}
        </div>
      )}

      <Sheet>
        <SheetTrigger className="hidden" ref={sheetRef}>
          Open
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
}
