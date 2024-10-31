import { ReactNode } from 'react';

import SelectContent from './SelectContent';

interface SelectContentWrapperProps {
  children: ReactNode
}

const SelectContentWrapper = ({ children }: SelectContentWrapperProps) => {
  return <SelectContent>{children}</SelectContent>
}

export default SelectContentWrapper
