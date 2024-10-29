import { DialogRoot } from "./DialogRoot"
import { DialogTrigger } from "./DialogTrigger"
import { DialogPortal } from "./DialogPortal"
import { DialogOverlay } from "./DialogOverlay"
import { DialogHeader } from "./DialogHeader"
import { DialogTitle } from "./DialogTitle"
import { DialogContent } from "./DialogContent"

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Header: DialogHeader,
  Title: DialogTitle,
  Content: DialogContent,
})
