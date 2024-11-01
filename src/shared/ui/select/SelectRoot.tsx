import { Root, SelectProps } from "@radix-ui/react-select"
import { SelectTrigger } from "./SelectTrigger"
import { SelectContent } from "./SelectContent"
import { SelectItem } from "./SelectItem"

interface SelectRootProps {
  placeholder: string
  items: { id: number; value: string; label: string }[]
  triggerStyle?: string
  contentStyle?: string
  value: string
  onValueChange: (v: string) => void
}

export const SelectRoot: React.FC<SelectRootProps & SelectProps> = ({
  items,
  triggerStyle = "w-[180px] border-2",
  contentStyle = "",
  placeholder,
  value,
  onValueChange,
}) => {
  return (
    <Root value={value} onValueChange={onValueChange}>
      <SelectTrigger placeholder={placeholder} className={triggerStyle} />

      <SelectContent
        className={`overflow-y-scroll max-h-[50vh] ${contentStyle}`}
      >
        <div>
          {items.map(({ value, label }, idx) => (
            <SelectItem key={`${idx}-${value}`} value={value} label={label} />
          ))}
        </div>
      </SelectContent>
    </Root>
  )
}
