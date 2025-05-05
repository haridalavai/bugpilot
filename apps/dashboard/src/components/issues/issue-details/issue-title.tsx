import Link from "next/link";

const IssueTitle = ({
  issueTitle,
  issueLevel,
  stack = [],
}: {
  issueTitle: string;
  issueLevel: string;
  stack: Array<string>;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-md font-bold">{issueTitle}</h1>
      <p className="text-sm hover:underline hover:underline-dotted hover:cursor-pointer border-l-4 border-red-800 pl-2">
        {`${stack.length > 0 ? stack[0]?.slice(0, 100) : ""}...`}
      </p>
    </div>
  );
};

export default IssueTitle;
