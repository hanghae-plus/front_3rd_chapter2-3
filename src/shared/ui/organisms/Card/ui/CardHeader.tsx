import { forwardRef } from 'react';

import { CardHeaderProps } from '../model/cardTypes';
import {
  cardStyles,
  getClassName,
} from '../styles/cardStyles';

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={getClassName(cardStyles.header, className)} {...props} />
))

CardHeader.displayName = "CardHeader"

export default CardHeader
