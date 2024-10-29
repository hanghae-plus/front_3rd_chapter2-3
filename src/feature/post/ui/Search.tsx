import { Search } from "lucide-react"
import { Input } from "../../../shared/ui/input/Text"

interface Props {
  setSearchQuery: (query: string) => void
  searchPosts: () => void
  searchQuery: string
}

export const SearchPost: React.FC<Props> = ({ setSearchQuery, searchPosts, searchQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts()
    }
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}
