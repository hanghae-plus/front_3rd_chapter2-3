// PostSearchTagSelect.tsx

import { Tag } from "../../../entities/posts/model/Post"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostSearchTagSelectProps {
  selectedTag: string
  setSelectedTag: (value: string) => void
  tags: Tag[]
  fetchPostsByTag: (tag: string) => void
  updateURL: () => void
}

const PostSearchTagSelect = ({
  selectedTag,
  setSelectedTag,
  tags,
  fetchPostsByTag,
  updateURL,
}: PostSearchTagSelectProps) => {
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

export default PostSearchTagSelect
