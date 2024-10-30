import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"

export const CustomDialog: React.FC<{
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  className?: string
  children: React.ReactNode
}> = ({ open, onOpenChange, title, className = "", children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
