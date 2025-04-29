import type React from "react"
import { cn } from "@bugpilot/ui/lib/utils"

interface DataItemProps {
  label: string
  value: string | number | boolean | React.ReactNode
  className?: string
  indentLevel?: number
}

const DataItem = ({ label, value, className, indentLevel = 0 }: DataItemProps) => {
  // Calculate padding based on indent level
  const paddingLeft = indentLevel > 0 ? `${indentLevel * 8}px` : "0px"

  return (
    <div className={cn("flex", className)} style={{ paddingLeft }}>
      <div className={cn("w-1/3 text-muted-foreground text-xs", indentLevel > 0 ? "pl-2" : "")}>{label}</div>
      <div className="w-2/3 text-xs">
        {value === "" ? <span className="italic text-muted-foreground">object</span> : value}
      </div>
    </div>
  )
}

interface DataDisplayProps {
  title?: string
  data: Record<string, any>
  className?: string
}

const validateJson = (value: string) => {
  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return false
  }
}

export const DataDisplay = ({ title, data, className }: DataDisplayProps) => {
  // Recursive function to render nested data with proper indentation
  const renderNestedData = (data: Record<string, any>, parentKey = "", level = 0, rowIndex = 0): React.ReactNode[] => {
    return Object.entries(data).flatMap(([key, value], index) => {
      const currentKey = parentKey ? `${parentKey}-${key}` : key
      const isEvenRow = (rowIndex + index) % 2 === 0

      if (validateJson(value)) {
        value = JSON.parse(value)
      }

      // If value is an object (but not null and not an array), we'll render it specially
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
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
          ...renderNestedData(value, currentKey, level + 1, rowIndex + index + 1),
        ]
      }

      // For non-object values, render normally
      return [
        <DataItem
          key={`${currentKey}`}
          label={key}
          value={Array.isArray(value) ? JSON.stringify(value) : value}
          className={isEvenRow ? "bg-muted/50" : ""}
          indentLevel={level}
        />,
      ]
    })
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {title && (
        <div className="p-4 border-b">
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
      )}
      <div className="divide-y">{renderNestedData(data)}</div>
    </div>
  )
}
