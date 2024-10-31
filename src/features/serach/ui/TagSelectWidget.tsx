import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { useQueryParams } from "../../../shared/model/useQueryParams"
import { useTags } from "../../../entities/Tag/model/useTag"

const TagSelectWidget = () => {
  const { selectedTag, setSelectedTag, updateURL } = useQueryParams()
  const { tagList } = useTags()

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    // fetchPostsByTag(value)
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
