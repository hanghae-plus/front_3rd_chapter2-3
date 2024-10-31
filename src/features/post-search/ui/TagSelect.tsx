import { TagType } from "../../../shared/type"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../shared/ui/select"

interface Props {
  selectedTag: any
  setSelectedTag: any
  fetchPostsByTag: any
  updateURL: any
  tags: any
}

const TagSelect = ({ selectedTag, setSelectedTag, fetchPostsByTag, updateURL, tags }: Props) => {
  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        fetchPostsByTag(value)
        updateURL()
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag: TagType) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TagSelect
