import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { TagType } from "../../entities/Tag/model/types"
import { useQueryParams } from "../../features/post/model/useQueryParams"

interface TagSelectWidgetProps {
  fetchPostsByTag: (value: string) => void
  tagList: TagType[]
}

const TagSelectWidget = ({ fetchPostsByTag, tagList }: TagSelectWidgetProps) => {
  const { selectedTag, setSelectedTag, updateURL } = useQueryParams()

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    fetchPostsByTag(value)
    updateURL()
  }

  return (
    <Select value={selectedTag} onValueChange={handleTagChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tagList.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TagSelectWidget
