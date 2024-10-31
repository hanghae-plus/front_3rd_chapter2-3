import { forwardRef } from "react"
import { TextareaProps } from "../model/textTypes"
import { getTextareaClassName } from "../styles/textStyles"

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <textarea className={getTextareaClassName(className)} ref={ref} {...props} />
})

Textarea.displayName = "Textarea"

export default Textarea
