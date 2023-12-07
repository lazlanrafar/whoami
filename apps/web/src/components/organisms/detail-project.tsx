import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IProject } from "@/types";
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from "@/api/event/project";
import Image from "next/image";
import { whoAmiAsset } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import ButtonDelete from "../atoms/button-delete";

interface Props {
  projectId: string;
  open: boolean;
  onOpenChange: () => void;
}

export default function DetailProject({
  projectId,
  open,
  onOpenChange,
}: Props) {
  const [project, setProject] = React.useState<IProject | null>(null);
  const { data, isLoading } = useGetProjectByIdQuery(projectId);

  React.useEffect(() => {
    setProject(data?.data?.data);
  }, [data]);

  const { mutate: deleteProject, isPending } = useDeleteProjectMutation();

  const handleDelete = () => {
    deleteProject(projectId);
    onOpenChange();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="hidden">Open</SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Detail Project</SheetTitle>
        </SheetHeader>

        <div className="mt-5 text-foreground">
          {project ? (
            <div className="">
              <Image
                src={whoAmiAsset(project.thumbnail)}
                width={350}
                height={100}
                alt="Thumbnails"
              />

              <br />
              <h3 className="text-xl font-medium mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm">
                {project.description}
              </p>

              <br />
              <h4 className="mb-2 text-sm font-medium">Tech Stack</h4>
              <div className="flex gap-1 flex-wrap">
                {project.technology?.map((tech, iTech) => (
                  <Badge key={iTech}>
                    <span>{tech.skill.title}</span>
                  </Badge>
                ))}
              </div>

              <Separator className="my-5" />

              <div className="flex gap-2">
                <Button variant={"outline"} className="flex gap-1">
                  <PencilIcon size={16} /> Update
                </Button>
                <ButtonDelete
                  onSubmit={handleDelete}
                  message={
                    <span>
                      This action cannot be undone. This will permanently delete
                      the <strong>{project.title}</strong> project.
                    </span>
                  }
                />
              </div>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
