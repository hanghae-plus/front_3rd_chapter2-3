import { ItemText, ItemIndicator, Item } from "@radix-ui/react-select"
import { DefaultProps, SelectItemProps } from "@shared/types"
import { Check } from "lucide-react"

export const SelectItem: React.FC<SelectItemProps & DefaultProps> = ({ className = "", value, label }) => {
  return (
    <Item
      className={`
        relative 
        flex items-center
        py-1.5 pl-8 pr-2
        w-full
        cursor-default select-none
        rounded-sm text-sm
        outline-none
        focus:bg-accent focus:text-accent-foreground
        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50
        ${className}
      `}
      value={value}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>
      <ItemText>{label}</ItemText>
    </Item>
  )
}
