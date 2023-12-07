import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useGetSkillQuery } from "@/api/event/skill";
import { IProjectForm, ISkill } from "@/types";
import SelectMultiple, { ISelectMultiple } from "../molecules/select-multiple";
import { formProjectSchema } from "@/schemas";
import {
  useCreateProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "@/api/event/project";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { whoAmiAsset } from "@/lib/utils";

interface Props {
  projectId?: string;
}

export default function FormProject({ projectId }: Props) {
  const router = useRouter();
  const [listSkill, setListSkill] = React.useState<ISelectMultiple[]>([]);
  const { data: skills } = useGetSkillQuery();

  useEffect(() => {
    if (!skills) return;

    setListSkill(
      skills?.data?.data?.map((item: ISkill) => ({
        label: item.title,
        value: item.id,
      })) || []
    );
  }, [skills]);

  const [selectedSkill, setSelectedSkill] = React.useState<ISelectMultiple[]>(
    []
  );

  const thumbnailRef = React.useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string>("");
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE = 5 * 1024 * 1024;

    if (e.target.files?.length) {
      if (e.target.files[0].size > MAX_SIZE) {
        return toast.error(`File size must be less than ${MAX_SIZE}MB`);
      }

      setThumbnail(e.target.files[0]);
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const form = useForm<z.infer<typeof formProjectSchema>>({
    resolver: zodResolver(formProjectSchema),
    defaultValues: {
      thumbnail: "",
      title: "",
      description: "",
      url: "https://",
      source_code: "https://github.com/",
    },
  });

  const { data: project } = useGetProjectByIdQuery(projectId || "");

  useEffect(() => {
    if (!project?.data.data && !projectId) return;

    form.setValue("thumbnail", project?.data?.data?.thumbnail || "");
    form.setValue("title", project?.data?.data?.title || "");
    form.setValue("description", project?.data?.data?.description || "");
    form.setValue("url", project?.data?.data?.url || "");
    form.setValue("source_code", project?.data?.data?.source_code || "");

    setThumbnailPreview(
      project?.data?.data?.thumbnail
        ? whoAmiAsset(project?.data?.data?.thumbnail)
        : ""
    );

    setSelectedSkill(
      project?.data?.data?.technology?.map((item: any) => ({
        label: item.skill.title,
        value: item.skill.id,
      })) || []
    );
  }, [projectId]);

  const { mutate: createProject, isPending: pendingCreate } =
    useCreateProjectMutation();
  const { mutate: updateProject, isPending: pendingUpdate } =
    useUpdateProjectMutation();

  const onSubmit = async (data: any) => {
    const payload: IProjectForm = {
      ...data,
      thumbnail: thumbnail,
      technology: selectedSkill.map((item) => item.value),
    };

    if (projectId) await updateProject({ id: projectId, ...payload });
    else await createProject(payload);

    router.push("/projects");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          {thumbnailPreview ? (
            <Image
              src={thumbnailPreview}
              width={200}
              height={200}
              alt="Thumbnail Preview"
            />
          ) : (
            <div className="w-full h-40 border border-dashed rounded-lg grid place-items-center">
              <span className="text-sm text-muted-foreground">
                No thumbnail
              </span>
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
            ref={thumbnailRef}
          />
          <div className="flex gap-2">
            {thumbnail && (
              <Button
                type="button"
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  setThumbnail(null);
                  setThumbnailPreview("");
                }}
              >
                Remove
              </Button>
            )}
            <Button
              type="button"
              size={"sm"}
              variant={"outline"}
              onClick={() => thumbnailRef.current?.click()}
            >
              Upload Thumbnail
            </Button>
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="input title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="input description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="input url" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Code</FormLabel>
              <FormControl>
                <Input placeholder="input source code" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SelectMultiple
          label="Tech Stack"
          items={listSkill}
          values={selectedSkill}
          onValueChange={(value) => setSelectedSkill(value)}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            size={"sm"}
            className=""
            loading={pendingCreate || pendingUpdate}
          >
            Save Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
