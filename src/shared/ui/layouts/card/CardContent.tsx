import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"
