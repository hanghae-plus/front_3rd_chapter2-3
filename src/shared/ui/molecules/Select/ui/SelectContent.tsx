import { forwardRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectContentProps } from '@radix-ui/react-select';

import {
  getClassName,
  selectStyles,
} from '../styles/selectStyles';

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={getClassName(selectStyles.content, className)}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={selectStyles.viewport}>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
)

SelectContent.displayName = SelectPrimitive.Content.displayName

export default SelectContent
