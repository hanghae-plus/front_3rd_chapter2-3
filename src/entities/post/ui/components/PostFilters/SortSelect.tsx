import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../shared"
import { SORT_LABELS, SORT_OPTIONS } from "../../../config/post.config"

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent className="w-[180px] mt-1">
        {Object.entries(SORT_OPTIONS).map(([key, value]) => (
          <SelectItem key={key} value={value}>
            {SORT_LABELS[value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
