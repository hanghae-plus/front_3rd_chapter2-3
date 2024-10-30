import { FC, ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui'

interface DialogLayoutProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  title?: string | ReactNode
  className?: string
}

export const DialogLayout: FC<DialogLayoutProps> = ({ open, onOpenChange, children, title, className = '' }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>{title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
