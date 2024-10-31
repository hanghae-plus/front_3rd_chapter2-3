import { ComponentPropsWithoutRef } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string
}
