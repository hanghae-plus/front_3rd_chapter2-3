import { ReactNode } from 'react';

import SelectTrigger from './SelectTrigger';

interface SelectTriggerWrapperProps {
  width?: string
  children: ReactNode
}

const SelectTriggerWrapper = ({ width, children }: SelectTriggerWrapperProps) => {
  return <SelectTrigger className={width || "w-[180px]"}>{children}</SelectTrigger>
}

export default SelectTriggerWrapper
