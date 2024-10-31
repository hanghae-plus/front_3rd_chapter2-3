import { forwardRef } from 'react';

import { CardTitleProps } from '../model/cardTypes';
import {
  cardStyles,
  getClassName,
} from '../styles/cardStyles';

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={getClassName(cardStyles.title, className)} {...props} />
))

CardTitle.displayName = "CardTitle"

export default CardTitle
