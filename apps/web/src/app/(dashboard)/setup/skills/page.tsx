"use client";

import { DataTable } from "@/components/atoms/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FiTrash, FiEdit } from "react-icons/fi";
import TableRowAction from "@/components/molecules/table-row-action";
import { useDeleteSkillMutation, useGetSkillQuery } from "@/api/event/skill";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import FormSkill from "@/components/organisms/form-skill";

export default function SkillsPage() {
  const columns: ColumnDef<any>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Year",
      accessorKey: "year",
    },
    {
      header: "Level",
      accessorKey: "level",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <TableRowAction
          items={[
            {
              title: "Edit",
              icon: <FiEdit />,
              onClick: () => {
                setModalForm(true);
              },
            },
            {
              title: "Delete",
              icon: <FiTrash />,
              onClick: () => {
                handleDelete(row.original.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  const { data, error, isLoading } = useGetSkillQuery();
  if (error) toast.error(error.message);

  const [modalForm, setModalForm] = useState<boolean>(false);

  const { mutate: handleDelete } = useDeleteSkillMutation();

  return (
    <div>
      <h3 className="text-xl">Skills</h3>
      <p className="text-muted-foreground text-sm">
        List of skills that I have acquired over the years.
      </p>

      <div className="mt-3">
        <div className="flex justify-end">
          <Button size={"sm"} onClick={() => setModalForm(true)}>
            <PlusIcon className="mr-1" size={14} />
            Add Skill
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data?.data?.data || []}
          loading={isLoading}
          search="title"
        />
      </div>

      <Dialog
        open={modalForm}
        onOpenChange={(open) => {
          setModalForm(open);
        }}
      >
        <FormSkill onClose={() => setModalForm(false)} />
      </Dialog>
    </div>
  );
}
