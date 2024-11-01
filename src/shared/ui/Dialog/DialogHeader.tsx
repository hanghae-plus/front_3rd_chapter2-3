import { FC, HTMLAttributes } from 'react';

export const DialogHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
);
DialogHeader.displayName = 'DialogHeader';
