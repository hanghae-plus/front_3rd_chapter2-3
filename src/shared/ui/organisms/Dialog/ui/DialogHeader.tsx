import { forwardRef } from 'react';

import { DialogHeaderProps } from '../model/dialogTypes';

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
))
DialogHeader.displayName = "DialogHeader"
