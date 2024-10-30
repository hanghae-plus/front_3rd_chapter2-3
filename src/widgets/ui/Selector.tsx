import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui"

interface OptionItem {
  value: string | undefined
  text: string
  key?: string
}

export const Selector: React.FC<{
  value: string | undefined
  onValueChange: (value: string) => void
  placeHolder?: string
  hasDefault?: boolean
  defaultItem?: OptionItem
  optionItems: OptionItem[]
}> = ({ value, onValueChange, placeHolder = "선택", hasDefault = false, defaultItem, optionItems }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {hasDefault && <SelectItem key={defaultItem?.key ?? defaultItem?.value} value={defaultItem?.value}>{defaultItem?.text}</SelectItem>}
        {optionItems.map((item) => (
          <SelectItem key={item.key ?? item.value} value={item.value}>{item.text}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
