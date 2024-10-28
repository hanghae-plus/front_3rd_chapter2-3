import { forwardRef, TableHTMLAttributes } from "react"

interface Props extends TableHTMLAttributes<HTMLTableElement> {
  className?: string
}

export const Table = forwardRef<HTMLTableElement, Props>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
Table.displayName = "Table"