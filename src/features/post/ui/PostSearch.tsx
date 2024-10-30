import { ChangeEvent, KeyboardEvent } from "react"
import { Input } from "../../../shared/ui"

export const PostSearch: React.FC<{
  searchQuery: string
  setSearchQuery: (value: string) => void
  getSearchedPosts: (value: string) => void
}> = ({ searchQuery, setSearchQuery, getSearchedPosts }) => {
  return (
    <Input
      placeholder="게시물 검색..."
      className="pl-8"
      value={searchQuery}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && getSearchedPosts(searchQuery)}
    />
  )
}
