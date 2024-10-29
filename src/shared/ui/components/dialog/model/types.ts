import { VariantProps } from "class-variance-authority"
import {
  contentVariants,
  headerVariants,
  overlayVariants,
  titleVariants,
} from "./store"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof overlayVariants> {}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof contentVariants> {
  closeButtonPosition?: "default" | "outside"
  closeButtonSize?: "default" | "sm" | "lg"
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {}

export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    VariantProps<typeof titleVariants> {}
