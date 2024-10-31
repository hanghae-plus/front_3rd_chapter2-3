import { forwardRef } from 'react';

import { Check } from 'lucide-react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';

import {
  getClassName,
  selectStyles,
} from '../styles/selectStyles';

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={getClassName(selectStyles.item, className)} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

SelectItem.displayName = SelectPrimitive.Item.displayName

export default SelectItem
