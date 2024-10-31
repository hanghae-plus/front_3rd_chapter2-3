import * as React from "react"

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={`w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  ),
)
Table.displayName = "Table"
