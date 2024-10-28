import { HTMLAttributes, forwardRef } from 'react';

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
);
TableBody.displayName = 'TableBody';
