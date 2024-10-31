import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { useQueryParams } from "../../../shared/model/useQueryParams"

export const SearchWidget = () => {
  const { searchQuery, setSearchQuery } = useQueryParams()

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchWidget
