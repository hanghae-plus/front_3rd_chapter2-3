import { Select, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePost } from "../../post/model/store"
import { useSearch } from "../../../shared/model/useSearch"
import { TagList } from "../../../widgets/tag/TagList"

export const TagSelect = () => {
  const { getPostsByTag } = usePost()
  const { selectedTag, updateURL, setSelectedTag } = useSearch()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        getPostsByTag(value)
        updateURL()
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <TagList />
    </Select>
  )
}
