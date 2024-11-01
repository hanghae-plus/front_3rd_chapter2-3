import { forwardRef } from "react"

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"
