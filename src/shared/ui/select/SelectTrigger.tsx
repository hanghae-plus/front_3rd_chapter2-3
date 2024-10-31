import { forwardRef } from "react"
import { SelectTriggerProps } from "../../types/components"
import * as SelectPrimitive from "@radix-ui/react-select"
import { triggerVariants } from "./select.variants"
import { ChevronDown } from "lucide-react"

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={triggerVariants({ className })}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Trigger>
  ),
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName