export interface DefaultProps {
  className?: string
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export interface SelectProps extends DefaultProps {
  placeholder: string
}

export interface SelectBoxItem {
  id: number
  label: string
  value: string
}

export interface SelectItemProps extends DefaultProps {
  label: string
  value: string
}
