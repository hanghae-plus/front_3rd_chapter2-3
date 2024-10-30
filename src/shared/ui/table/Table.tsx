import { forwardRef } from "react"
import { TableProps } from "../../types/components"
import { tableBodyVariants } from "./table.variants"

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={tableBodyVariants({ className })}
        {...props}
      />
    </div>
  ),
)
Table.displayName = "Table"