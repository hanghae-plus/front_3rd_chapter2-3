import { forwardRef, TableHTMLAttributes } from "react";

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  className?: string;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className || ""}`}
      {...props}
    />
  )
);

TableRow.displayName = "TableRow";