import { forwardRef, HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))
TableBody.displayName = "TableBody"
