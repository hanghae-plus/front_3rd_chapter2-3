import { useState } from "react"
import { TagSelect } from "../../../features/post-filter/ui/TagSelect"
import { SelectSortOrder } from "../../../features/post-sort/ui/SelectSortOrder"
import { SelectSortStandard } from "../../../features/post-sort/ui/SelectSortStandard"
import { usePostParamsStore } from "../../../features/post/model/postParamsStore"
import { usePostQueryStore } from "../../../features/post/model/postQueryStore"
import { SearchInput } from "../../../shared/ui"

export const PostSearchBar = () => {
  const { setActiveQuery } = usePostQueryStore()

  const [searchQueryInput, setSearchQueryInput] = useState("")
  const { setSearchQuery } = usePostParamsStore()

  const handleSearchPosts = () => {
    setActiveQuery("search")
    setSearchQuery(searchQueryInput)
  }

  return (
    <div className="flex gap-4">
      <SearchInput
        value={searchQueryInput}
        placeholder="게시물 검색..."
        onChange={(e) => setSearchQueryInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearchPosts()}
      />
      <TagSelect />
      <SelectSortStandard />
      <SelectSortOrder />
    </div>
  )
}
