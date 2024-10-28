import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        link: "underline-offset-4 hover:underline text-blue-500",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
        info: "bg-cyan-500 text-white hover:bg-cyan-600",
        light: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        dark: "bg-gray-800 text-white hover:bg-gray-900",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 rounded-md text-xs",
        lg: "h-11 px-8 rounded-md",
        icon: "h-9 w-9",
        xs: "h-6 px-2 rounded text-xs",
        xl: "h-14 px-10 rounded-lg text-base",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
    compoundVariants: [
      {
        variant: ["ghost", "link"],
        className: "hover:bg-transparent",
      },
      {
        size: "icon",
        className: "p-0",
      },
    ],
  }
)

export const inputVariants = cva(
  "flex rounded-md border border-input bg-white text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-300",
        error: "border-red-500",
        success: "border-green-500",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white",
        secondary: "bg-gray-50",
        ghost: "border-none shadow-none",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export const dialogVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg duration-200",
  {
    variants: {
      position: {
        center: "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
        top: "left-[50%] top-4 translate-x-[-50%]",
        bottom: "left-[50%] bottom-4 translate-x-[-50%]",
      },
      size: {
        default: "w-full max-w-lg",
        sm: "w-full max-w-sm",
        lg: "w-full max-w-2xl",
        xl: "w-full max-w-4xl",
        full: "w-[calc(100%-2rem)] h-[calc(100%-2rem)]",
      },
    },
    defaultVariants: {
      position: "center",
      size: "default",
    },
  }
)

export const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        striped: "[&_tbody_tr:nth-child(odd)]:bg-gray-50",
        bordered: "[&_td]:border [&_th]:border",
      },
      size: {
        default: "[&_td]:p-4 [&_th]:p-4",
        sm: "[&_td]:p-2 [&_th]:p-2",
        lg: "[&_td]:p-6 [&_th]:p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
