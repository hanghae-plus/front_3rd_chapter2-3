import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostFilters } from "../api/usePostFilters"
import { usePostFilter } from "../model/usePostFilter"

export const PostFilterTag = () => {
  const { selectedTag, setSelectedTag, updatePostFilter } = usePostFilter({})
  const { tags } = usePostFilters({ selectedTag })

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        updatePostFilter({ tag: value })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
