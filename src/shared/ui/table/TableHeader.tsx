import { forwardRef } from "react"

export interface TableProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const TableHeader = forwardRef<HTMLTableSectionElement, TableProps<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead 
      ref={ref} 
      className={`[&_tr]:border-b ${className}`} 
      {...props} 
    />
  )
)
TableHeader.displayName = "TableHeader" 