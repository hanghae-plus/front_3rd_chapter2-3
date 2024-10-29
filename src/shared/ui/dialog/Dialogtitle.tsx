import * as React from "react"
import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
)
DialogTitle.displayName = DialogPrimitive.Title.displayName
