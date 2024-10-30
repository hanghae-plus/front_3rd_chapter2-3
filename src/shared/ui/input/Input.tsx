import { forwardRef } from "react"
import inputVariants from "./input.variants"
import { InputProps } from "../../types/components"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({
          variant,
          size: size as unknown as "default" | "sm" | "lg",
          className,
        })}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"