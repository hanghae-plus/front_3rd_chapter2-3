import React from "react"

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

// DialogHeader 컴포넌트
export const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
)
DialogHeader.displayName = "DialogHeader"
