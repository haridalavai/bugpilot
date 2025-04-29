import { getIssue } from "@/src/api/issues";
import IssueTitle from "@/src/components/issues/issue-details/issue-title";
import { Separator } from "@bugpilot/ui/components/separator";
import { DataDisplay } from "@bugpilot/ui/components/data-display";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  if (!id) {
    return <div>No issue id provided</div>;
  }

  const issue = await getIssue(id as string);
  console.log("issue", issue.data.data[0]);

  return (
    <div className="container">
      <div className="px-4 py-3">
        <IssueTitle
          issueTitle={issue.data.data[0].message}
          issueLevel={issue.data.data[0].level}
          stack={issue.data.data[0].stacktrace}
        />
      </div>
      <Separator />
      <DataDisplay
        data={issue.data.data[0]}
      />
    </div>
  );
};

export default IssueDetailsPage;
