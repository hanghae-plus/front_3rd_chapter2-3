import { forwardRef } from "react"

export const CardRoot = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`}
      {...props}
    />
  ),
)

CardRoot.displayName = "Card"
