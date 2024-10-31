import { forwardRef } from "react"
import { CardDefaultProps } from "../model/types.ts"

export const CardContent = forwardRef<HTMLDivElement, CardDefaultProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"
