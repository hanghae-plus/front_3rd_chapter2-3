import { forwardRef } from "react"
import { TableCellProps } from "../../types/components"
import { tableCellVariants } from "./table.variants"

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, truncate, ...props }, ref) => (
    <td
      ref={ref}
      className={tableCellVariants({ align, truncate, className })}
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"