import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { Tag } from "../../../entities/tag/types"

interface Props {
  selectedTag: string
  setSelectedTag: (value: string) => void
  handleGetPostsByTag: (value: string) => void
  updateURL: () => void
  tags: Tag[]
}

export const SelectTag = ({ selectedTag, setSelectedTag, handleGetPostsByTag, updateURL, tags }: Props) => {
  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        handleGetPostsByTag(value)
        updateURL()
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
