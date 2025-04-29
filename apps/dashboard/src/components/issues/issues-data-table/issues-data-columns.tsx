import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@bugpilot/ui/components/checkbox";
import { DataTableColumnHeader } from "./issues-table-column-header";
import { Badge } from "@bugpilot/ui/components/badge";
import { levels } from "./constants";
import { DataTableRowActions } from "./issue-table-row-actions";
import Link from "next/link";

export type Issue = {
  id: string;
  projectId: string;
  timestamp: string;
  message: string;
  occurrences: number;
  type: number;
  level: string;
  traceId: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Issue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    accessorKey: "message",
    cell: ({ row }) => {
      return (
        <div className="flex gap-7">
          {/* <Badge variant="outline">{row.original.level}</Badge>    */}
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`/issues/${row.original.id}`}>
              {row.getValue("message")}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => {
      const level = levels.find(
        (level) => level.value === row.getValue("level")
      );

      if (!level) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {level.icon && (
            <level.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{level.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occurrences" />
    ),
    accessorKey: "occurrences",
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center justify-end">
          {row.getValue("occurrences")}
        </div>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Seen" />
    ),
    accessorKey: "timestamp",
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {new Date(Number(row.getValue("timestamp"))).toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
