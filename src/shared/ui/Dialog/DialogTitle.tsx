import { forwardRef } from 'react';

import { DialogTitleProps, Title } from '@radix-ui/react-dialog';

interface IDialogTitle extends DialogTitleProps {
  className?: string;
}
export const DialogTitle = forwardRef<HTMLHeadingElement, IDialogTitle>(({ className, ...props }, ref) => (
  <Title ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
));
DialogTitle.displayName = Title.displayName;
