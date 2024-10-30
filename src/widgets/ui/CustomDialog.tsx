import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { HighlightedText } from "./HighlightedText"

export const CustomDialog: React.FC<{
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  highlightedText?: string
  className?: string
  children: React.ReactNode
}> = ({ open, onOpenChange, title, highlightedText, className = "", children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle><HighlightedText text={title} highlight={highlightedText} /></DialogTitle>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
