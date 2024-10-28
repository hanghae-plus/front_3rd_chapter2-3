import { forwardRef } from "react"
import {
  TableBodyProps,
  TableCellProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "../model/types"
import {
  tableBodyVariants,
  tableCellVariants,
  tableHeadVariants,
  tableRowVariants,
} from "../model/store"

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={tableBodyVariants({ className })}
        {...props}
      />
    </div>
  ),
)
Table.displayName = "Table"

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={tableBodyVariants({ className })} {...props} />
  ),
)
TableBody.displayName = "TableBody"

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={tableRowVariants({ className })} {...props} />
  ),
)
TableRow.displayName = "TableRow"

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

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, truncate, ...props }, ref) => (
    <td
      ref={ref}
      className={tableCellVariants({ align, truncate, className })}
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"
