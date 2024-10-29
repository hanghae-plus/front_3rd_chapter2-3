import { VariantProps } from "class-variance-authority"
import textareaVariants from "./store"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string
}
