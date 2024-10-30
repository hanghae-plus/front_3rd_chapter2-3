import { cva } from "class-variance-authority"

export const overlayVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "bg-black/50",
        dark: "bg-black/80",
        light: "bg-black/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export const contentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      size: {
        default: "w-full max-w-lg p-6 md:w-full",
        sm: "w-full max-w-sm p-4 md:w-full",
        lg: "w-full max-w-2xl p-8 md:w-full",
        full: "w-[95vw] p-6 md:w-[90vw]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export const headerVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    align: {
      default: "text-center sm:text-left",
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "default",
  },
})

export const titleVariants = cva("leading-none tracking-tight", {
  variants: {
    size: {
      default: "text-lg font-semibold",
      sm: "text-base font-medium",
      lg: "text-xl font-bold",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export const closeButtonVariants = cva(
  "absolute rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
  {
    variants: {
      position: {
        default: "right-4 top-4",
        outside: "-right-4 -top-4",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      position: "default",
      size: "default",
    },
  },
)