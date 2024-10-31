import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Input } from "../../../shared/ui"
import { useRouterQueries } from "../model/routerStore"

export const PostSearch = () => {
  const { searchQuery, setSearchQuery } = useRouterQueries()

  const [query, setQuery] = useState(searchQuery)

  return (
    <Input
      placeholder="게시물 검색..."
      className="pl-8"
      value={query}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setSearchQuery(query)}
    />
  )
}
