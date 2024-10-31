import { forwardRef } from "react"
import { ButtonProps } from "../model/buttonTypes"
import { buttonVariants } from "../styles/buttonStyles"

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
})

Button.displayName = "Button"

export default Button
