import { ReactNode } from 'react'
import { Select } from './Select'

type SelectLayoutProps = {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  children: ReactNode
}

export const SelectLayout = ({ value, onValueChange, placeholder, children }: SelectLayoutProps) => {
  return (
    <Select.Container value={value} onValueChange={onValueChange}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Select.Content>{children}</Select.Content>
    </Select.Container>
  )
}
