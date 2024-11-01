import { forwardRef } from "react"

export interface TableProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const Table = forwardRef<HTMLTableElement, TableProps<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table 
        ref={ref} 
        className={`table-fixed w-full caption-bottom text-sm ${className}`} 
        {...props} 
      />
    </div>
  )
)
Table.displayName = "Table"
