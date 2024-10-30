import { forwardRef } from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <div ref={ref} className="card-class" {...props} />
))
Card.displayName = "Card"
