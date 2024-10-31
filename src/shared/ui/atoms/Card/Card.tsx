import { forwardRef } from 'react';

import {
  CardProps,
  cardStyles,
  getClassName,
} from '../../organisms/Card';

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={getClassName(cardStyles.card, className)} {...props} />
))

Card.displayName = "Card"

export default Card
