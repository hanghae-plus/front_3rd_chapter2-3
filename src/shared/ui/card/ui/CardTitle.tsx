import { forwardRef } from "react"
import { CardDefaultProps } from "../model/types.ts"

export const CardTitle = forwardRef<HTMLDivElement, CardDefaultProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"
