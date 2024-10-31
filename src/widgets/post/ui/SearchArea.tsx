import { Search } from "lucide-react"
import { Input } from "../../../shared/ui/Input"

interface Props {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  searchPosts: () => Promise<void>
}

export const SearchArea = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
}: Props) => {
  return (
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
  )
}
