import {
  ElementRef,
  forwardRef,
} from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { DialogTitleProps } from '../model/dialogTypes';

export const DialogTitle = forwardRef<ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
)
DialogTitle.displayName = DialogPrimitive.Title.displayName
