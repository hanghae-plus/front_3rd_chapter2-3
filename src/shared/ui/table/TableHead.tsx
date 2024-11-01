import { forwardRef } from "react"

export interface TableProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const TableHead = forwardRef<HTMLTableHeaderCellElement, TableProps<HTMLTableHeaderCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead" 