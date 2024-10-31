import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { usePostSearch } from "../model/usePostSearch"

interface PostSearchProps {
  onSearch: (query: string) => void
}

export const PostSearch = ({ onSearch }: PostSearchProps) => {
  const { searchQuery, isSearching, setSearchQuery, handleSearch } = usePostSearch(onSearch)

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        disabled={isSearching}
      />
    </div>
  )
}
