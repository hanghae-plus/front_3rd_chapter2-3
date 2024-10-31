import { forwardRef, HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export const TableRow = forwardRef<HTMLTableRowElement, Props>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
))
TableRow.displayName = "TableRow"
