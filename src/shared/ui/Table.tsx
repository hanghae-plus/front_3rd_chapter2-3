import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  className?: string
}

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  className?: string
}

type TableHeadProps = ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  className?: string
}

type TableCellProps = TdHTMLAttributes<HTMLTableDataCellElement> & {
  className?: string
}

const Table = forwardRef<HTMLTableElement, TableProps>(({ className = '', ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className = '', ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className = '', ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className = '', ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
))

const TableHead = forwardRef<HTMLTableHeaderCellElement, TableHeadProps>(({ className = '', ...props }, ref) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))

const TableCell = forwardRef<HTMLTableDataCellElement, TableCellProps>(({ className = '', ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))

Table.displayName = 'Table'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableHead.displayName = 'TableHead'
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
