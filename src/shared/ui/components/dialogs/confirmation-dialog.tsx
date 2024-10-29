import { Button } from "../button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onConfirm: () => void
  confirmText?: string
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "확인",
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {children}
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
