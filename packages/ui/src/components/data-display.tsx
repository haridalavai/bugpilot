import type React from "react";
import { cn } from "@bugpilot/ui/lib/utils";

interface DataItemProps {
  label: string;
  value: string | number | boolean | React.ReactNode;
  className?: string;
  indentLevel?: number;
  isEvenRow?: boolean;
}

const DataItem = ({
  label,
  value,
  className,
  indentLevel = 0,
  isEvenRow = false,
}: DataItemProps) => {
  // Calculate padding based on indent level
  const DEFAULT_PADDING = 12;
  const paddingLeft =
    indentLevel > 0
      ? `${indentLevel * DEFAULT_PADDING}px`
      : `${DEFAULT_PADDING}px`;
  const paddingRight = DEFAULT_PADDING;

  return (
    <div
      className={cn(
        "flex rounded-sm font-mono",
        isEvenRow ? "bg-muted/50" : "",
        className
      )}
      style={{ paddingLeft, paddingRight }}
    >
      <div
        className={cn(
          "w-1/3 text-muted-foreground text-xs flex flex-row items-center ",
          indentLevel > 0 ? "pl-2" : ""
        )}
      >
        {indentLevel > 0 && (
          <div
            className={cn(
              "border-l border-b rounded-bl-sm h-3 w-3 self-start mr-[4px] col-span-1",
              "border-muted"
            )}
          />
        )}
        <div className="py-1">{label}</div>
      </div>
      <div className="w-2/3 text-xs font-light py-1">{value === "" ? <></> : value}</div>
    </div>
  );
};

interface DataDisplayProps {
  title?: string;
  data: Record<string, any>;
  className?: string;
}

const validateJson = (value: string) => {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const DataDisplay = ({ title, data, className }: DataDisplayProps) => {
  // Recursive function to render nested data with proper indentation
  const renderNestedData = (
    data: Record<string, any>,
    parentKey = "",
    level = 0,
    rowIndex = 0
  ): React.ReactNode[] => {
    return Object.entries(data).flatMap(([key, value], index) => {
      const currentKey = parentKey ? `${parentKey}-${key}` : key;
      const isEvenRow = (rowIndex + index) % 2 === 0;

      if (validateJson(value)) {
        value = JSON.parse(value);
      }

      // If value is an object (but not null and not an array), we'll render it specially
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return [
          // Render the parent key in a highlighted row
          <DataItem
            key={`${currentKey}`}
            label={key}
            value=""
            className={isEvenRow ? "bg-muted/50" : ""}
            indentLevel={level}
          />,
          // Recursively render all nested properties with increased indentation
          ...renderNestedData(
            value,
            currentKey,
            level + 1,
            rowIndex + index + 1
          ),
        ];
      }

      // For non-object values, render normally
      return [
        <DataItem
          key={`${currentKey}`}
          label={key}
          value={Array.isArray(value) ? JSON.stringify(value) : value}
          isEvenRow={isEvenRow}
          indentLevel={level}
        />,
      ];
    });
  };

  return (
    <div className={cn("", className)}>
      {title && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium">{title}</h3>
        </div>
      )}
      <div className="">{renderNestedData(data)}</div>
    </div>
  );
};
