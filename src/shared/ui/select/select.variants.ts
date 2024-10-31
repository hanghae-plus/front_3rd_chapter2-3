import { cva } from "class-variance-authority"

export const triggerVariants = cva(
  "flex items-center justify-between rounded-md border bg-white text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus:ring-ring",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const selectContentVariants = cva(
  "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      size: {
        default: "p-1",
        sm: "p-0.5",
        lg: "p-1.5",
      },
      variant: {
        default: "border-border",
        error: "border-red-500",
        success: "border-green-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
)

export const itemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      size: {
        default: "py-1.5 pl-8 pr-2 text-sm",
        sm: "py-1 pl-6 pr-1.5 text-xs",
        lg: "py-2 pl-10 pr-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)
