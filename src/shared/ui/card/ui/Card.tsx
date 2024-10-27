import { forwardRef } from "react"
import { CardDefaultProps } from "../model/types.ts"

export const Card = forwardRef<HTMLDivElement, CardDefaultProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
))
Card.displayName = "Card"
