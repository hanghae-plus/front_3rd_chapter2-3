import { VariantProps } from "class-variance-authority"
import buttonVariants from "./store"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string
}
