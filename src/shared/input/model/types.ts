import { VariantProps } from "class-variance-authority"
import inputVariants from "./store"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  className?: string
}
