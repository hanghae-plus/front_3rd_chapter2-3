import { forwardRef } from "react"

export interface CardProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 

export const CardContent = forwardRef<HTMLDivElement, CardProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`p-6 pt-0 ${className}`} 
      {...props} 
    />
  )
)

CardContent.displayName = 'CardContent'