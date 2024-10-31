import { HTMLAttributes, forwardRef } from "react"

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}

interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

interface TableHeaderCell extends HTMLAttributes<HTMLTableHeaderCellElement> {
  className?: string
}

interface TableDataCell extends HTMLAttributes<HTMLTableDataCellElement> {
  className?: string
}

// 테이블 컴포넌트
export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
Table.displayName = "Table"

export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))
TableBody.displayName = "TableBody"

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
))
TableRow.displayName = "TableRow"

export const TableHead = forwardRef<HTMLTableHeaderCellElement, TableHeaderCell>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableHead.displayName = "TableHead"

export const TableCell = forwardRef<HTMLTableDataCellElement, TableDataCell>(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))
TableCell.displayName = "TableCell"
