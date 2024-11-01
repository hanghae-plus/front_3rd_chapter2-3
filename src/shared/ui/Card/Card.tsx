import { forwardRef } from 'react';

import { CardProps } from './type';

// 카드 컴포넌트
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
));
Card.displayName = 'Card';
