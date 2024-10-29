import { forwardRef } from "react"
import {
  CardContentProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "../model/types"

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  ),
)
Card.displayName = "Card"

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  ),
)
CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
)
CardTitle.displayName = "CardTitle"

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  ),
)
CardContent.displayName = "CardContent"
