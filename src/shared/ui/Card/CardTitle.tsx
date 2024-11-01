import { forwardRef } from 'react';

import { CardProps } from './type';

export const CardTitle = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
));
CardTitle.displayName = 'CardTitle';
