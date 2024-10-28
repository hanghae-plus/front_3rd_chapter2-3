import { VariantProps } from "class-variance-authority"
import {
  tableBodyVariants,
  tableCellVariants,
  tableHeaderVariants,
  tableHeadVariants,
  tableRowVariants,
  tableVariants,
} from "./store"

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  wrapperClassName?: string
  className?: string
  layout?: VariantProps<typeof tableVariants>["layout"]
  density?: VariantProps<typeof tableVariants>["density"]
  borderStyle?: VariantProps<typeof tableVariants>["borderStyle"]
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align">,
    VariantProps<typeof tableHeadVariants> {
  textAlign?: VariantProps<typeof tableHeadVariants>["align"]
}

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align">,
    VariantProps<typeof tableCellVariants> {
  textAlign?: VariantProps<typeof tableCellVariants>["align"]
}
