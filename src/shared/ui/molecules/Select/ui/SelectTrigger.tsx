import { forwardRef } from 'react';

import { ChevronDown } from 'lucide-react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectTriggerProps } from '@radix-ui/react-select';

import {
  getClassName,
  selectStyles,
} from '../styles/selectStyles';

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={getClassName(selectStyles.trigger, className)} {...props}>
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
))

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export default SelectTrigger
