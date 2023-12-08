"use client";

import { useGetProjectQuery } from "@/api/event/project";
import CardProject from "@/components/molecules/card-project";
import SkeletonProject from "@/components/molecules/skeleton-project";
import DetailProject from "@/components/organisms/detail-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";
import { IProject } from "@/types";
import { Plus, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user } = useStore();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(user?.user_metadata?.preferred_username ?? "");
  }, [user]);

  const search = searchParams.get("search") ?? "";
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    router.push(`/projects?search=${value}`);
  };

  const [searchDebounce] = useDebounce(search, 500);

  const [limit, setLimit] = useState<number>(8);
  const { data, isLoading, refetch, isFetching } = useGetProjectQuery({
    limit: limit,
    search: searchDebounce,
  });

  useEffect(() => {
    refetch();
  }, [limit, searchDebounce]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  let intersectionObserver: IntersectionObserver | null = null;
  if (typeof window !== "undefined") {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) return;

      if (data?.data?.pagination.next_page && !isLoading && !isFetching) {
        setLimit(limit * 2);
      }
    });
  }

  useEffect(() => {
    if (loadMoreRef.current) {
      intersectionObserver?.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        intersectionObserver?.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, intersectionObserver]);

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

      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <Input
            placeholder="Search Project"
            className="max-w-[300px]"
            value={search}
            onChange={handleSearch}
          />
          {search && (
            <Button
              size={"sm"}
              variant={"link"}
              onClick={() => router.push("/projects")}
            >
              <XIcon className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
        <Link href="/projects/form">
          <Button size={"sm"}>
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-4 gap-4 mt-5">
          <SkeletonProject />
          <SkeletonProject className="hidden sm:block" />
          <SkeletonProject className="hidden sm:block" />
          <SkeletonProject className="hidden sm:block" />
        </div>
      ) : data?.data?.data.length > 0 ? (
        <div>
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

          {data?.data?.pagination.next_page && (
            <div className="flex justify-center mt-5">
              <Button
                size={"sm"}
                onClick={() => setLimit(limit * 2)}
                loading={isLoading || isFetching}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-32">
          <img
            src="/not-found.svg"
            alt="Not Found"
            className="h-20 w-2h-20 mb-5 text-foreground"
          />
          <p className="text-muted-foreground text-sm">
            Project not found, try to add new project.
          </p>
        </div>
      )}

      <div ref={loadMoreRef} />

      <DetailProject
        projectId={projectId}
        open={sheetDetailOpen}
        onOpenChange={() => setSheetDetailOpen(!sheetDetailOpen)}
      />
    </main>
  );
}
