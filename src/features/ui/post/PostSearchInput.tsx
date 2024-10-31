import { Search } from "lucide-react"
import { Input } from "../../../shared/ui/input/Input"
import { URLParams } from "../../../shared/types"

interface PostSearchInputProps {
  value: string
  onChange: (params: Partial<URLParams>) => void
  onSearch: (value: string) => void
}

export const PostSearchInput = ({ value, onChange, onSearch }: PostSearchInputProps) => (
  <div className="flex-1">
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={value}
        onChange={(e) => onChange({ search: e.target.value })}
        onKeyPress={(e) => e.key === "Enter" && onSearch(value)}
      />
    </div>
  </div>
)
