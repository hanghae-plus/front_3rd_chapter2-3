import { FC, ReactNode } from 'react'
import { Dialog } from '@shared/ui'

interface DialogLayoutProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  title?: string | ReactNode
  className?: string
}

export const DialogLayout: FC<DialogLayoutProps> = ({ open, onOpenChange, children, title, className = '' }) => {
  return (
    <Dialog.Container open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={className}>
        <Dialog.Header>{title && <Dialog.Title>{title}</Dialog.Title>}</Dialog.Header>
        <div className="space-y-4">{children}</div>
      </Dialog.Content>
    </Dialog.Container>
  )
}
