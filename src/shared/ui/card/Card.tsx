import { forwardRef } from "react"

// interface CardProps extends React.HTMLAttributes<HTMLDivElement>{}

export const Card = forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} className="card-class" {...props} />)
Card.displayName = "Card"
