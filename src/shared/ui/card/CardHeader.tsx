import { forwardRef } from "react"

export interface CardProps<T> extends React.HTMLAttributes<T> {
  className?: string
} 
export const CardHeader = forwardRef<HTMLDivElement, CardProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`flex flex-col space-y-1.5 p-6 ${className}`} 
      {...props} 
    />
  )
)

CardHeader.displayName = 'CardHeader'