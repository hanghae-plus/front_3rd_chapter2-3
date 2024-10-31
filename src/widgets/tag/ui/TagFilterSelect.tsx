import { Tag } from "../../../entities/post/model/post"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/Select"

interface Props {
  tags: Tag[]
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
  fetchPostsByTag: (tag: string) => Promise<void>
  updateURL: () => void
}

export const TagFilterSelect = ({
  tags,
  selectedTag,
  setSelectedTag,
  fetchPostsByTag,
  updateURL,
}: Props) => {
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
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
