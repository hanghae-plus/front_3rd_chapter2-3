import { VariantProps } from "class-variance-authority";
import buttonVariants from "../ui/button/button.variants";
import { cardContentVariants, cardHeaderVariants, cardTitleVariants, cardVariants } from "../ui/card/card.variants";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { contentVariants, headerVariants, overlayVariants, titleVariants } from "../ui/dialog/dialog.variants";
import inputVariants from "../ui/input/input.variants";
import SelectPrimitive from "@radix-ui/react-select";
import { itemVariants, selectContentVariants, triggerVariants } from "../ui/select/select.variants";
import { tableBodyVariants, tableCellVariants, tableHeaderVariants, tableHeadVariants, tableRowVariants, tableVariants } from "../ui/table/table.variants";
import textareaVariants from "../ui/textarea/textarea.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string
}

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface DialogOverlayProps
extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
  VariantProps<typeof overlayVariants> {}

export interface DialogContentProps
extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  VariantProps<typeof contentVariants> {
closeButtonPosition?: "default" | "outside"
closeButtonSize?: "default" | "sm" | "lg"
}

export interface DialogHeaderProps
extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof headerVariants> {}

export interface DialogTitleProps
extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
  VariantProps<typeof titleVariants> {}

  export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  className?: string
}

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {}

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof itemVariants> {}

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

  export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string
}
