import { Portal, Content, Viewport, SelectContentProps } from "@radix-ui/react-select"
import { PropsWithChildren } from "react"

export const SelectContent: React.FC<PropsWithChildren<SelectContentProps>> = ({
  children,
  className,
  position = "popper",
}) => {
  return (
    <Portal>
      <Content
        className={`
            overflow-hidden
            relative z-50 min-w-[8rem] w-full
            rounded-md border bg-white text-popover-foreground
            shadow-md
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95
            data-[state=open]:zoom-in-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
            ${className}
        `}
        position={position}
      >
        <Viewport className="p-1">{children}</Viewport>
      </Content>
    </Portal>
  )
}
