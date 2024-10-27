import * as React from "react"
import { forwardRef } from "react"


// Table 컴포넌트 타입 정의
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    className?: string
  }

// 테이블 컴포넌트
export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  ))
  Table.displayName = "Table"
  

  // TableHeader 컴포넌트 타입 정의
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string
  }

  export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
  ))
  TableHeader.displayName = "TableHeader"
  

  // TableBody 컴포넌트 타입 정의
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string
  }

  export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  ))
  TableBody.displayName = "TableBody"
  

  // TableRow 컴포넌트 타입 정의
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    className?: string
  }

  export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
      {...props}
    />
  ))
  TableRow.displayName = "TableRow"
  

  // TableHead 컴포넌트 타입 정의
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    className?: string
  }

  export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  ))
  TableHead.displayName = "TableHead"
  

  // TableCell 컴포넌트 타입 정의
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string
  }

  export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
    <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
  ))
  TableCell.displayName = "TableCell"
  