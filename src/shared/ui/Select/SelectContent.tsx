import { forwardRef } from "react"
import { Portal, Content, Viewport, type SelectContentProps } from "@radix-ui/react-select"

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className || ""}`}
        position={position}
        {...props}
      >
        <Viewport className="p-1">{children}</Viewport>
      </Content>
    </Portal>
  ),
)
SelectContent.displayName = "SelectContent"
