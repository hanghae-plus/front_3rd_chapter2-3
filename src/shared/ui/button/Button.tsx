import { forwardRef } from "react"
import buttonVariants from "./button.variants"
import { ButtonProps } from "../../types/components"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"
