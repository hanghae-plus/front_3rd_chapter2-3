import { forwardRef, HTMLAttributes } from "react"

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))

CardTitle.displayName = "CardTitle"