import { Search } from "lucide-react"
import { Input } from "../../../../../shared"

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  ;<div className="relative">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="게시물 검색..."
      className="pl-8"
      value={value}
      onChange={onChange}
      onKeyPress={(e) => e.key === "Enter" && onSearch()}
    />
  </div>
}
