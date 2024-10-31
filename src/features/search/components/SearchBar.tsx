import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { ChangeEvent, KeyboardEvent } from "react"

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    key === "Enter" && onSubmit()
  }

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default SearchBar
