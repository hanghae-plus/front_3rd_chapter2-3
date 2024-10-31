import { Search } from "lucide-react"
import { usePostsStore } from "../../../entities/post"
import { Input } from "../../../shared/ui"

export const PostSearch = () => {
  const { searchQuery, setSearchQuery } = usePostsStore()

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e.currentTarget.value)}
      />
    </div>
  )
}
