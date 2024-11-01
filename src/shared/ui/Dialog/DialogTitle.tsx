import { forwardRef } from "react"
import { DialogTitleProps, Title } from "@radix-ui/react-dialog"

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, ...props }, ref) => (
  <Title ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
))
DialogTitle.displayName = Title.displayName
