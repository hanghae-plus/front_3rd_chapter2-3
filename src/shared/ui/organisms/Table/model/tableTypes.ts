import { ComponentPropsWithoutRef } from 'react';

export type TableProps = ComponentPropsWithoutRef<"table"> & {
  className?: string
}

export type TableHeaderProps = ComponentPropsWithoutRef<"thead"> & {
  className?: string
}

export type TableBodyProps = ComponentPropsWithoutRef<"tbody"> & {
  className?: string
}

export type TableRowProps = ComponentPropsWithoutRef<"tr"> & {
  className?: string
}

export type TableHeadProps = ComponentPropsWithoutRef<"th"> & {
  className?: string
}

export type TableCellProps = ComponentPropsWithoutRef<"td"> & {
  className?: string
}
