import { forwardRef, ThHTMLAttributes } from "react"

interface Props extends ThHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export const TableCell = forwardRef<HTMLTableCellElement, Props>(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))
TableCell.displayName = "TableCell"
