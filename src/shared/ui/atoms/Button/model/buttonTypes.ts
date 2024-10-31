import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "../styles/buttonStyles"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string
}
