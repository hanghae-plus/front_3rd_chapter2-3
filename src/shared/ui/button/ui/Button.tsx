import { forwardRef } from "react"
import { ButtonProps } from "../model/types.ts"
import { buttonVariants } from "../model/buttonVariants.ts"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
})

Button.displayName = "Button"
