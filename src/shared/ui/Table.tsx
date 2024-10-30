import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react"

type TableElement = ElementRef<"table">
type TableProps = ComponentPropsWithoutRef<"table">

export const Table = forwardRef<TableElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={`w-full caption-bottom text-sm ${className}`}
          {...props}
        />
      </div>
    )
  },
)
Table.displayName = "Table"

type TableHeaderElement = ElementRef<"thead">
type TableHeaderProps = ComponentPropsWithoutRef<"thead">

export const TableHeader = forwardRef<TableHeaderElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return <thead ref={ref} className={`border-b ${className}`} {...props} />
  },
)
TableHeader.displayName = "TableHeader"

type TableBodyElement = ElementRef<"tbody">
type TableBodyProps = ComponentPropsWithoutRef<"tbody">

export const TableBody = forwardRef<TableBodyElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={`[&_tr:last-child]:border-0 ${className}`}
        {...props}
      />
    )
  },
)
TableBody.displayName = "TableBody"

type TableRowElement = ElementRef<"tr">
interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {
  "data-state"?: "selected" | "disabled"
}

export const TableRow = forwardRef<TableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
        {...props}
      />
    )
  },
)
TableRow.displayName = "TableRow"

type TableHeadElement = ElementRef<"th">
type TableHeadProps = ComponentPropsWithoutRef<"th">

export const TableHead = forwardRef<TableHeadElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      />
    )
  },
)
TableHead.displayName = "TableHead"

type TableCellElement = ElementRef<"td">
type TableCellProps = ComponentPropsWithoutRef<"td">

export const TableCell = forwardRef<TableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      />
    )
  },
)
TableCell.displayName = "TableCell"
