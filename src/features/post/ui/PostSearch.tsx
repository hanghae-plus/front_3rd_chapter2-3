import { Search } from "lucide-react"
import { usePost } from "../model/store"
import { useSearch } from "../../../shared/model/useSearch"
import { Input } from "../../../shared/ui"

export const PostSearch = () => {
  const { searchPosts } = usePost()
  const { setSearchQuery, searchQuery } = useSearch()
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchPosts()}
        />
      </div>
    </div>
  )
}
