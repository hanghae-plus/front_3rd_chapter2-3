import { forwardRef } from "react"
import { CardDefaultProps } from "../model/types.ts"

export const CardHeader = forwardRef<HTMLDivElement, CardDefaultProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"
