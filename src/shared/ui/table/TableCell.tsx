import { forwardRef } from "react"

export interface TableProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const TableCell = forwardRef<HTMLTableDataCellElement, TableProps<HTMLTableDataCellElement>>(
  ({ className, ...props }, ref) => (
    <td 
      ref={ref} 
      className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} 
      {...props} 
    />
  )
)
TableCell.displayName = "TableCell" 