import { forwardRef } from "react"
import { TableRowProps } from "../../types/components"
import { tableRowVariants } from "./table.variants"

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={tableRowVariants({ className })} {...props} />
  ),
)
TableRow.displayName = "TableRow"