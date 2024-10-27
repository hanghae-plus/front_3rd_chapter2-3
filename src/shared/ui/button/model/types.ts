import { ButtonHTMLAttributes } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "./buttonVariants.ts"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  className?: string
}
