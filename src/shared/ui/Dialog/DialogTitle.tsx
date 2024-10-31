import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef } from "react";

interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className || ""}`}
      {...props}
    />
  )
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;