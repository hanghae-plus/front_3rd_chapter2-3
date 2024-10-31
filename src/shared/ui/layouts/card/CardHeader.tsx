import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"
