import { forwardRef } from "react"

export interface CardProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const Card = forwardRef<HTMLDivElement, CardProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} 
      {...props} 
    />
  )
)

Card.displayName = 'Card'