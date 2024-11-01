import { HTMLAttributes, forwardRef } from 'react';

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
);
TableHeader.displayName = 'TableHeader';
