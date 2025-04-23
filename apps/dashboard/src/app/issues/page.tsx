import { getIssues, GetIssuesParams } from "@/src/api/issues";
import { API_ENDPOINTS } from "@/src/api/api-endpoints";
import IssuesTable from "@/src/components/issues/issues-data-table";
import { Suspense } from "react";

const ITEMS_PER_PAGE = "10";
const CURRENT_PAGE = "1";

interface IssueQueryParams extends GetIssuesParams {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const IssuesPage: React.FC<IssueQueryParams> = async ({ searchParams }) => {
  const { projectId, level, type, search, from, to, page, limit } =
    await searchParams;

  const filterParams: GetIssuesParams = {
    projectId: projectId as string,
    level: level as string,
    type: type as string,
    search: search as string,
    from: from as string,
    to: to as string,
    page: (page as string) || CURRENT_PAGE,
    limit: (limit as string) || ITEMS_PER_PAGE,
  };

  const issues = getIssues(filterParams);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="text-2xl font-bold">Issues</h1>
        <div className="flex flex-col gap-4">
          <IssuesTable data={issues} />
        </div>
      </Suspense>
    </div>
  );
};

export default IssuesPage;
