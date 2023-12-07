import { whoAmiAsset } from "@/lib/utils";
import { IProject } from "@/types";
import { Badge } from "lucide-react";
import React from "react";

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

        <div className="flex flex-wrap gap-2">
          {project.technology?.map((tech, iTech) => (
            <Badge key={iTech}>
              <span>{tech.skill.title}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}