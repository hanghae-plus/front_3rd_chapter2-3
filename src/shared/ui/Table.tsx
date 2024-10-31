import { forwardRef } from "react";
import { mixinClasses } from "../lib/utils";

// Table Container ======================================================

type TableContainerProps = React.HTMLAttributes<HTMLTableElement> & {
  className?: string;
};

const TableContainer = forwardRef<HTMLTableElement, TableContainerProps>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={mixinClasses("table-fixed w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
TableContainer.displayName = "TableContainer";

// Table Header ======================================================

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
};

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={mixinClasses("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

// Table Body ======================================================

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
};

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={mixinClasses("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

// Table Row ======================================================

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  className?: string;
};

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={mixinClasses(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// Table Head ======================================================

type TableHeadProps = React.HTMLAttributes<HTMLTableCellElement> & {
  className?: string;
};

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={mixinClasses(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// Table Cell ======================================================

type TableCellProps = React.HTMLAttributes<HTMLTableCellElement> & {
  className?: string;
  colSpan?: number;
};

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, colSpan, ...props }, ref) => (
  <td
    ref={ref}
    colSpan={colSpan}
    className={mixinClasses("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const Table = Object.assign(
  {
    Container: TableContainer,
    Header: TableHeader,
    Body: TableBody,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
  },
  {},
);
