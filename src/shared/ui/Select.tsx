import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react"
import {
  Root,
  Group,
  Value,
  Trigger,
  Portal,
  Content,
  Viewport,
  Item,
  ItemIndicator,
  ItemText,
} from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"

export const Select = Root
export const SelectGroup = Group
export const SelectValue = Value

type SelectTriggerElement = ElementRef<typeof Trigger>
type SelectTriggerProps = ComponentPropsWithoutRef<typeof Trigger>

export const SelectTrigger = forwardRef<
  SelectTriggerElement,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <Trigger
      ref={ref}
      className={`flex h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Trigger>
  )
})
SelectTrigger.displayName = "SelectTrigger"

type SelectContentElement = ElementRef<typeof Content>
type SelectContentProps = ComponentPropsWithoutRef<typeof Content>

export const SelectContent = forwardRef<
  SelectContentElement,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => {
  return (
    <Portal>
      <Content
        ref={ref}
        className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
        position={position}
        {...props}
      >
        <Viewport className="p-1">{children}</Viewport>
      </Content>
    </Portal>
  )
})
SelectContent.displayName = "SelectContent"

type SelectItemElement = ElementRef<typeof Item>
type SelectItemProps = ComponentPropsWithoutRef<typeof Item>

export const SelectItem = forwardRef<SelectItemElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <ItemIndicator>
            <Check className="h-4 w-4" />
          </ItemIndicator>
        </span>
        <ItemText>{children}</ItemText>
      </Item>
    )
  },
)
SelectItem.displayName = "SelectItem"
