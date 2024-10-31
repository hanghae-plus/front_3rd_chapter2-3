import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

type Props = DialogPrimitive.DialogTitleProps

export const DialogTitle = forwardRef<HTMLHeadingElement, Props>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName
