import { whoAmiAsset } from "@/lib/utils";
import { IProject } from "@/types";
import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  project: IProject;
  onClick?: () => void;
}

export default function CardProject({ project, onClick }: Props) {
  return (
    <div
      className="max-w-sm group cursor-pointer rounded-lg border bg-muted"
      onClick={onClick}
    >
      <img
        className=" max-h-[180px] rounded-lg w-full object-cover"
        src={whoAmiAsset(project.thumbnail)}
        alt=""
      />

      <div className="p-5">
        <h5 className="mb-2 font-medium truncate tracking-tight">
          {project.title}
        </h5>

        <p className="mb-3 text-sm text-muted-foreground">
          {project.description.substring(0, 50)}...
        </p>

        {project.technology?.length ? (
          <div className="flex flex-wrap gap-2 mt-auto">
            <Badge>
              <span>{project.technology?.[0].skill.title}</span>
            </Badge>
            {project.technology?.length > 1 ? (
              <Badge>
                <span>+{project.technology?.length - 1}</span>
              </Badge>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
