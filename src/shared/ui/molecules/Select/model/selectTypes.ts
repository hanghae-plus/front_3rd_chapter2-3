import { ComponentPropsWithoutRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

export interface SelectTriggerProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  className?: string
}

export interface SelectContentProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  className?: string
  position?: "popper" | "item-aligned"
}

export interface SelectItemProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  className?: string
}
