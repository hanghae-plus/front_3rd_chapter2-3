import * as React from "react"

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b bg-muted/50 ${className}`} {...props} />
  ),
)
TableHeader.displayName = "TableHeader"
