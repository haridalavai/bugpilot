import StackDisplay from "./stack-display";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bugpilot/ui/components/accordion";

const Stacktrace: React.FC<{ stacktrace: Array<string> }> = ({
  stacktrace,
}) => {
  return (
    <div className=" rounded-md">
      <Accordion type="single" collapsible>
        {stacktrace.map((item) => {
          const source = JSON.parse(item);
          console.log(source);
          return (
            <div className="flex flex-col py-1 rounded-md">
              <AccordionItem value={source.fileName + source.lineNumber}>
                <AccordionTrigger>
                  <div className="flex flex-row gap-2">
                    <p className="text-xs text-muted-foreground font-light">
                      <span className="text-foreground">{source.fileName}</span>{" "}
                      in{" "}
                      <span className="text-foreground">
                        {source.functionName}
                      </span>{" "}
                      at line{" "}
                      <span className="text-foreground">
                        {source.lineNumber}:{source.columnNumber}
                      </span>
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md">
                  <StackDisplay
                      key={item}
                      source={source.source}
                      culpritRow={source.lineNumber}
                      culpritColumn={source.columnNumber}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Stacktrace;
