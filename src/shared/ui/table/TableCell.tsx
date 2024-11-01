import * as React from "react"
import { forwardRef } from "react"

export const TableCell = forwardRef<HTMLTableDataCellElement, React.HTMLAttributes<HTMLTableDataCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
  ),
)
TableCell.displayName = "TableCell"
