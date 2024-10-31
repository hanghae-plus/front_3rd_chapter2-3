import { forwardRef } from "react"
import { buttonVariants } from "./Button.styles"
import { ButtonProps } from "."

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
})

Button.displayName = "Button"
