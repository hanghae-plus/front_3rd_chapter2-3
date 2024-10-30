import { forwardRef } from "react"
import { DialogTitleProps } from "../../types/components"
import { titleVariants } from "./dialog.variants"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={titleVariants({ className })}
      {...props}
    />
  ),
)
DialogTitle.displayName = DialogPrimitive.Title.displayName
