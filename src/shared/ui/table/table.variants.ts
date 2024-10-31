import { cva } from "class-variance-authority"

export const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    layout: {
      fixed: "table-fixed",
      auto: "table-auto",
    },
    density: {
      default: "",
      compact: "text-xs",
      comfortable: "text-base",
    },
    borderStyle: {
      default: "border",
      none: "",
      bordered:
        "border border-separate border-spacing-0 [&_th]:border [&_td]:border",
    },
  },
  defaultVariants: {
    layout: "fixed",
    density: "default",
    borderStyle: "default",
  },
})

export const tableHeaderVariants = cva("[&_tr]:border-b", {
  variants: {
    sticky: {
      true: "sticky top-0 z-10 bg-white",
      false: "",
    },
    variant: {
      default: "",
      separated: "border-t border-b-2",
    },
  },
  defaultVariants: {
    sticky: false,
    variant: "default",
  },
})

export const tableBodyVariants = cva("[&_tr:last-child]:border-0", {
  variants: {
    striped: {
      true: "[&_tr:nth-child(odd)]:bg-muted/50",
      false: "",
    },
  },
  defaultVariants: {
    striped: false,
  },
})

export const tableRowVariants = cva(
  "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  {
    variants: {
      height: {
        default: "h-14",
        sm: "h-10",
        lg: "h-16",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      height: "default",
      interactive: false,
    },
  },
)

export const tableHeadVariants = cva(
  "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      width: {
        auto: "",
        small: "w-24",
        medium: "w-32",
        large: "w-48",
      },
    },
    defaultVariants: {
      align: "left",
      width: "auto",
    },
  },
)

export const tableCellVariants = cva(
  "p-2 align-middle [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      align: "left",
      truncate: false,
    },
  },
)