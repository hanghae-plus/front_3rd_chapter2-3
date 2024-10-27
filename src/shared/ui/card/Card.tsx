import { forwardRef, HTMLAttributes } from 'react'

//type으로 변경
export type CardProps = HTMLAttributes<HTMLDivElement>

// 카드 컴포넌트
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  ))
  Card.displayName = "Card"


  // 카드 헤더 컴포넌트
 export  type CardHeaderProps= HTMLAttributes<HTMLDivElement>
 
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  ))
  CardHeader.displayName = "CardHeader"
  

 // 카드 타이틀 컴포넌트
 export  type CardTitleProps= HTMLAttributes<HTMLDivElement>

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
    <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
  ))
  CardTitle.displayName = "CardTitle"
  
// 카드 콘텐츠 컴포넌트
export  type CardContentProps= HTMLAttributes<HTMLDivElement>

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  ))
  CardContent.displayName = "CardContent"