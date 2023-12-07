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
import { ISkill } from "@/types";
import SelectMultiple, { ISelectMultiple } from "../molecules/select-multiple";
import { formProjectSchema } from "@/schemas";

export default function FormProject() {
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

  const onSubmit = (data: any) => {
    console.log(selectedSkill);
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          onValueChange={(value) => setSelectedSkill(value)}
        />

        <div className="flex justify-end">
          <Button type="submit" size={"sm"} className="">
            Save Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
