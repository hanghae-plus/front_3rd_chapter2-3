import { ComponentPropsWithoutRef, forwardRef } from 'react';

interface TableContainerProps extends ComponentPropsWithoutRef<'table'> {
  className?: string;
}
const TableContainer = forwardRef<HTMLTableElement, TableContainerProps>(
  ({ className = '', ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={`table-fixed w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    </div>
  )
);
TableContainer.displayName = 'Table';

interface TableHeaderProps extends ComponentPropsWithoutRef<'thead'> {
  className?: string;
}
const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = '', ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {
  className?: string;
}
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', ...props }, ref) => (
    <tbody
      ref={ref}
      className={`[&_tr:last-child]:border-0 ${className}`}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  className?: string;
}
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

interface TableHeadProps extends ComponentPropsWithoutRef<'th'> {
  className?: string;
}
const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = '', ...props }, ref) => (
    <th
      ref={ref}
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  className?: string;
}
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = '', ...props }, ref) => (
    <td
      ref={ref}
      className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export const Table = Object.assign(TableContainer, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell
});
