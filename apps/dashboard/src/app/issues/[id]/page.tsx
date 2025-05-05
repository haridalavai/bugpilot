import { getIssue } from "@/src/api/issues";
import IssueTitle from "@/src/components/issues/issue-details/issue-title";
import { Separator } from "@bugpilot/ui/components/separator";
import { DataDisplay } from "@bugpilot/ui/components/data-display";
import IssueSummary from "@/src/components/issues/issue-details/issue-summary";
import Stacktrace from "@/src/components/issues/issue-details/stacktrace";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  if (!id) {
    return <div>No issue id provided</div>;
  }

  const issue = await getIssue(id as string);
  console.log("issue", issue.data.data[0]?.device);

  return (
    <div className="flex flex-col gap-2">
      <div className="px-4 py-3">
        <IssueTitle
          issueTitle={issue.data.data[0]?.message}
          issueLevel={issue.data.data[0]?.level}
          stack={issue.data.data[0]?.stacktrace}
        />
      </div>
      <Separator />

      <div className="px-4 py-3">
        <IssueSummary
          os={"windows"}
          browser={"chrome"}
          country={"India"}
          timestamp={"2021-01-01"}
        />
      </div>
      <Separator />
      <div className="px-4 py-3 flex flex-col gap-2 justify-center ">
        <div className="flex flex-row gap-2">
          <div className="w-1/2 flex flex-col gap-2">
            <DataDisplay
              data={{
                message: issue.meta.message,
                level: issue.meta.level,
                occurrences: issue.meta.occurrences,
                traceId: issue.meta.traceId,
              }}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <DataDisplay
              data={{
                sessionId: issue.meta.sessionId,
                status: issue.meta.session.status,
                source: issue.meta.session.source,
                environment: issue.meta.session.environment,
              }}
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-md font-bold">Stacktrace</h2>
        <Stacktrace stacktrace={issue.data.data[0]?.stacktrace} />
      </div>
      <Separator />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-md font-bold">Breadcrumbs</h2>
        {/* <Stacktrace stacktrace={issue.data.data[0].stacktrace} /> */}
        <p className="text-sm text-muted-foreground">no breadcrumbs recorded</p>
      </div>
      <Separator />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-md font-bold">Replays</h2>
        <p className="text-sm text-muted-foreground">
          Replay is not available for this issue
        </p>
      </div>
      <Separator />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-md font-bold">Context</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2 border rounded-md p-2">
            <DataDisplay
              data={JSON.parse(issue.data.data[0]?.device || "{}").cpu}
              title="Device"
            />
          </div>
          <div className="flex flex-col gap-2 border rounded-md p-2">
            <DataDisplay
              data={JSON.parse(issue.data.data[0]?.device || "{}").browser}
              title="Browser"
            />
          </div>
          <div className="flex flex-col gap-2 border rounded-md p-2">
            <DataDisplay
              data={JSON.parse(issue.data.data[0]?.device || "{}").os}
              title="OS"
            />
          </div>
          <div className="flex flex-col gap-2 border rounded-md p-2">
            <DataDisplay
              data={{
                ...JSON.parse(issue.data.data[0]?.device || "{}").screen,
                ...JSON.parse(issue.data.data[0]?.device || "{}").viewport,
              }}
              title="Screen"
            />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default IssueDetailsPage;
