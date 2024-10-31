import { forwardRef } from "react"
import textareaVariants from "./textarea.variants"
import { TextareaProps } from "../../types/components"

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, resize, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          className={textareaVariants({
            variant: error ? "error" : variant,
            size,
            resize,
            className,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    )
  },
)
Textarea.displayName = "Textarea"
