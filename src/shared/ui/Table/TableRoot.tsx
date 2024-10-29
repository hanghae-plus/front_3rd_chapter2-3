import { forwardRef } from "react"

export const TableRoot = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className || ""}`} {...props} />
    </div>
  ),
)
TableRoot.displayName = "Table"
