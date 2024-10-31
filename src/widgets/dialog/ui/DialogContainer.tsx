import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"

interface Props {
  isOpen: boolean
  setOpen: (value: boolean) => void
  title: React.ReactNode
  children: React.ReactNode
}

const DialogContainer: React.FC<Props> = ({ isOpen, setOpen, title, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogContainer
