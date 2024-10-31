import { forwardRef } from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}

const CardWrapper = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
))

const CardContent = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))

const CardHeader = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))

const CardTitle = forwardRef<HTMLHeadingElement, CardProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))

CardWrapper.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardTitle.displayName = 'CardTitle'

// export { Card, CardContent, CardHeader, CardTitle }

export const Card = Object.assign({
  Container: CardWrapper,
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
})
