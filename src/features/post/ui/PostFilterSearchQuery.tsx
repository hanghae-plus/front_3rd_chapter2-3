import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { usePostFilter } from "../model/usePostFilter"
import { usePostFilters } from "../api/usePostFilters"

export const PostFilterSearchQuery = () => {
  const { searchQuery, setSearchQuery } = usePostFilter({})
  const postFilters = usePostFilters({ searchQuery })

  const handleSearchPosts = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postFilters.refetchPosts()
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
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearchPosts}
        />
      </div>
    </div>
  )
}
