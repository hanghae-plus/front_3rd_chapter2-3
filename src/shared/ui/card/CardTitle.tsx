import { forwardRef } from "react"
export interface CardProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 
export const CardTitle = forwardRef<HTMLHeadingElement, CardProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 
      ref={ref} 
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`} 
      {...props} 
    />
  )
)

CardTitle.displayName = 'CardTitle'