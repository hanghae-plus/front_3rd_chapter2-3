import { forwardRef } from "react"
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
} from "../model/types"
import { contentVariants, titleVariants } from "../model/store"

// 대화상자 컴포넌트
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogOverlay = DialogPrimitive.Overlay

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        className={contentVariants({ className })}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
)
DialogContent.displayName = DialogPrimitive.Content.displayName

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }) => (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    />
  ),
)
DialogHeader.displayName = "DialogHeader"

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={titleVariants({ className })}
      {...props}
    />
  ),
)
DialogTitle.displayName = DialogPrimitive.Title.displayName
