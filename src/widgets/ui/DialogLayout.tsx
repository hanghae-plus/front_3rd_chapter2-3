import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from '@shared/ui'
import { FC, ReactNode } from 'react'

interface DialogLayoutProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  title: string | ReactNode
}

export const DialogLayout: FC<DialogLayoutProps> = ({ open, onOpenChange, children, title }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>{title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
