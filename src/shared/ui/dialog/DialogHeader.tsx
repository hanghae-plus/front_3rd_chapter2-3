import { forwardRef } from "react"
import { DialogHeaderProps } from "../../types/components"

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }) => (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    />
  ),
)
DialogHeader.displayName = "DialogHeader"
