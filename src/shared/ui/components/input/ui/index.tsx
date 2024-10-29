import { forwardRef } from "react"
import { InputProps } from "../model/types"
import inputVariants from "../model/store"

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
