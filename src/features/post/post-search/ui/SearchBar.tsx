import { type FC } from "react"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui/components/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
    </>
  )
}
