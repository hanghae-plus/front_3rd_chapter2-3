import { forwardRef } from "react"
import { TableBodyProps } from "../../types/components"
import { tableBodyVariants } from "./table.variants"

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={tableBodyVariants({ className })} {...props} />
  ),
)
TableBody.displayName = "TableBody"