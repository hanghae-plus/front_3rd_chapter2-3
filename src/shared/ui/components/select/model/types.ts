import { VariantProps } from "class-variance-authority"
import { contentVariants, itemVariants, triggerVariants } from "./store"
import * as SelectPrimitive from "@radix-ui/react-select"

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {}

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof contentVariants> {}

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof itemVariants> {}
