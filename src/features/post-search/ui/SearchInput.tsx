import { Search } from "lucide-react"
import { Input } from "../../../shared/ui/input/ui/Input.tsx"
import { useState } from "react"
import { ParamValue } from "../model/types.ts"
import { useQuerySearchPost } from "../api/useQuerySearchPost.ts"

interface Props {
  searchQuery: string
  setParam: (key: "searchQuery", value?: ParamValue) => void
}

const SearchInput = ({ searchQuery, setParam }: Props) => {
  const [query, setQuery] = useState("")
  useQuerySearchPost({ query })

  const handleSearch = (value: string) => {
    setQuery(value)
  }

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setParam("searchQuery", e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.currentTarget.value)
          }
        }}
      />
    </div>
  )
}

export default SearchInput
