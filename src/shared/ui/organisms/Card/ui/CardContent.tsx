import { forwardRef } from 'react';

import { CardContentProps } from '../model/cardTypes';
import {
  cardStyles,
  getClassName,
} from '../styles/cardStyles';

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={getClassName(cardStyles.content, className)} {...props} />
))

CardContent.displayName = "CardContent"

export default CardContent
