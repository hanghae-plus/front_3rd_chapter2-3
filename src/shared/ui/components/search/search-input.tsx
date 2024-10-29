import { Search } from "lucide-react"
import { Input } from "../input"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
}: SearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSearch()}
      />
    </div>
  )
}
