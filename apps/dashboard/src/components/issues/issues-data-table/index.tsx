"use client";

import { use } from "react";
import { columns, Issue } from "./issues-data-columns";
import { IssuesDataTable } from "./issues-data-table";

export interface IssuesTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Promise<{ items: Issue[], meta: {
    total: number
    page: number
    limit: number
    hasMore: boolean
  } }>;
}

const IssuesTable: React.FC<IssuesTableProps> = ({
  data,
  ...props
}) => {
  const allIssues = use(data);
  return (
    <IssuesDataTable columns={columns} data={allIssues.items} metadata={allIssues.meta} {...props} />
  );
};

export default IssuesTable;
