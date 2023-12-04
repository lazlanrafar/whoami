"use client";

import { DataTable } from "@/components/atoms/data-table";
import { ColumnDef } from "@tanstack/react-table";
import data from "./data.json";
import { FiTrash, FiEdit } from "react-icons/fi";
import TableRowAction from "@/components/molecules/table-row-action";

const columns: ColumnDef<any>[] = [
  {
    header: "Task",
    accessorKey: "id",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <TableRowAction
        items={[
          { title: "Edit", icon: <FiEdit /> },
          { title: "Delete", icon: <FiTrash /> },
        ]}
      />
    ),
  },
];

export default function SkillsPage() {
  return (
    <div>
      <h3 className="text-xl">Skills</h3>
      <p className="text-muted-foreground text-sm">
        List of skills that I have acquired over the years. I am always learning
        new things.
      </p>

      <div className="mt-3">
        <DataTable columns={columns} data={data} search="status" />
      </div>
    </div>
  );
}
