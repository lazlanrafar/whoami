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

const skillColumns: ColumnDef<any>[] = [
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
];

export default function SkillsPage() {
  const columns: ColumnDef<any>[] = [
    ...skillColumns,
    {
      header: "Actions",
      cell: ({ row }) => (
        <TableRowAction
          items={[
            {
              title: "Edit",
              icon: <FiEdit />,
              onClick: () => {
                handleUpdate(row.original.id);
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

  const [idUpdate, setIdUpdate] = useState<string>("");
  const [modalForm, setModalForm] = useState<boolean>(false);

  const handleUpdate = (id: string) => {
    setIdUpdate(id);
    setModalForm(true);
  };

  const handleOpenModal = () => setModalForm(true);
  const handleCloseModal = () => {
    setIdUpdate("");
    setModalForm(false);
  };

  const { mutate: handleDelete } = useDeleteSkillMutation();

  return (
    <div>
      <h3 className="text-xl">Skills</h3>
      <p className="text-muted-foreground text-sm">
        List of skills that I have acquired over the years.
      </p>

      <div className="mt-3">
        <div className="flex justify-end">
          <Button size={"sm"} onClick={() => handleOpenModal()}>
            <PlusIcon className="mr-1" size={14} />
            Add Skill
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data?.data || []}
          loading={isLoading}
          search="title"
        />
      </div>

      <Dialog open={modalForm} onOpenChange={(open) => setModalForm(open)}>
        <FormSkill onClose={() => handleCloseModal()} idUpdate={idUpdate} />
      </Dialog>
    </div>
  );
}
