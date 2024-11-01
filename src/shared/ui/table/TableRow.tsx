import { forwardRef } from "react"

export interface TableProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const TableRow = forwardRef<HTMLTableRowElement, TableProps<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow" 