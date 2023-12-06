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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { useGetSkillQuery } from "@/api/event/skill";
import { ISkill } from "@/types";
import SelectMultiple, { ISelectMultiple } from "../molecules/select-multiple";

export default function FormProject() {
  // const form = useForm<z.infer<typeof formSkillSchema>>({
  //     resolver: zodResolver(formSkillSchema),
  //     defaultValues: {
  //       title: "",
  //       year: new Date().getFullYear(),
  //     },
  //   });
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

  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  const [selectedSkill, setSelectedSkill] = React.useState<ISelectMultiple[]>(
    []
  );

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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Textarea {...field} />
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

        <br />
        <div className="flex mt-5">
          <Button type="submit" size={"sm"} className="">
            Save Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
