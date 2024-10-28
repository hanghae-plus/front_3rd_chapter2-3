import { cva } from "class-variance-authority"

const textareaVariants = cva(
  "flex w-full rounded-md border bg-white text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      size: {
        default: "min-h-[150px] px-3 py-2",
        sm: "min-h-[100px] px-2 py-1 text-xs",
        lg: "min-h-[200px] px-4 py-3 text-base",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      resize: "vertical",
    },
  },
)

export default textareaVariants
