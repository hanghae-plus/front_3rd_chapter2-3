import { forwardRef } from "react"
import { getInputClassName } from "../styles/InputStyles"
import { InputProps } from "../model/InputTypes"

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return <input type={type} className={getInputClassName(className)} ref={ref} {...props} />
})

Input.displayName = "Input"

export default Input
