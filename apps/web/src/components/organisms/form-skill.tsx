"use client";
import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { formSkillSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  useCreateSkillMutation,
  useGetSkillByIdQuery,
  useUpdateSkillMutation,
} from "@/api/event/skill";

interface Props {
  onClose: () => void;
  idUpdate?: string;
}

export default function FormSkill({ onClose, idUpdate }: Props) {
  const form = useForm<z.infer<typeof formSkillSchema>>({
    resolver: zodResolver(formSkillSchema),
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
    },
  });

  const {
    data,
    refetch,
    isSuccess,
    isPending: pendingFetch,
  } = useGetSkillByIdQuery(idUpdate ?? "");

  useEffect(() => {
    refetch();
    if (!data) return;

    form.setValue("title", data?.data?.title);
    form.setValue("year", data?.data?.year);
  }, [idUpdate, form, isSuccess]);

  const { mutate: createSkill, isPending: pendingCreate } =
    useCreateSkillMutation();
  const { mutate: updateSkill, isPending: pendingUpdate } =
    useUpdateSkillMutation();

  async function onSubmit(values: z.infer<typeof formSkillSchema>) {
    if (idUpdate) await updateSkill({ id: idUpdate, ...values });
    else await createSkill(values);

    onClose();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add a new skill</DialogTitle>
        <DialogDescription>
          Fill the form below to add a new skill to your profile.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Input Title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Year"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <div className="flex mt-5">
            <Button
              type="submit"
              size={"sm"}
              className="w-full"
              loading={pendingCreate || pendingUpdate || pendingFetch}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
