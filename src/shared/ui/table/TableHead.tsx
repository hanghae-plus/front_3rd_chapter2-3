import { forwardRef } from "react"
import { TableHeadProps } from "../../types/components"
import { tableHeadVariants } from "./table.variants"

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align, width, ...props }, ref) => (
    <th
      ref={ref}
      className={tableHeadVariants({ align, width, className })}
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"