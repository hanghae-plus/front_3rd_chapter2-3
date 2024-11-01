import { forwardRef } from "react"

export interface TableProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const TableBody = forwardRef<HTMLTableSectionElement, TableProps<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody 
      ref={ref} 
      className={`[&_tr:last-child]:border-0 ${className}`} 
      {...props} 
    />
  )
)
TableBody.displayName = "TableBody" 