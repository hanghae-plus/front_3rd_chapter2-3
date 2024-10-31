import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        flat: "shadow-none",
        elevated: "shadow-lg",
      },
      size: {
        default: "p-0",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    padding: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
    },
    align: {
      default: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    padding: "default",
    align: "default",
  },
})

export const cardTitleVariants = cva(
  "font-semibold leading-none tracking-tight",
  {
    variants: {
      size: {
        default: "text-2xl",
        sm: "text-xl",
        lg: "text-3xl",
      },
      weight: {
        default: "font-semibold",
        bold: "font-bold",
        medium: "font-medium",
      },
    },
    defaultVariants: {
      size: "default",
      weight: "default",
    },
  },
)

export const cardContentVariants = cva("pt-0", {
  variants: {
    padding: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
    },
    spacing: {
      default: "space-y-4",
      sm: "space-y-2",
      lg: "space-y-6",
    },
  },
  defaultVariants: {
    padding: "default",
    spacing: "default",
  },
})
