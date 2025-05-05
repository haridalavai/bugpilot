import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { syntaxHighlighterTheme } from "./syntax-highlighter-theme";

export default function StackDisplay({
  source,
  culpritRow,
  culpritColumn,
}: {
  source: Array<{
    line: string;
    content: string;
  }>;
  culpritRow: number;
  culpritColumn: number;
}) {
  const fullCode = source.map((item) => item.content).join("\n");
  return (
    <div className="flex flex-col rounded-md">
      <SyntaxHighlighter
        language={"javascript"}
        style={syntaxHighlighterTheme}
        showLineNumbers
        startingLineNumber={Number(source[0]?.line) || 1}
        wrapLines
        lineNumberStyle={{ color: "#888", paddingRight: "16px" }}

        customStyle={{
          backgroundColor: "var(--background)",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
        }}
        lineProps={(line) => {
          return {
            style: {
              display: "block",
              backgroundColor: line === culpritRow ? "var(--sidebar-accent)" : "var(--background)",
              fontStyle: 'normal',
              width: 'fit-content',
              borderRadius: line === culpritRow ? '5px' : '0px',
              padding: '4px'
            },
          };
        }}
      >
        {fullCode}
      </SyntaxHighlighter>
    </div>
  );
}
