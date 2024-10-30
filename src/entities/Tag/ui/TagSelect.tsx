import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { TagType } from "../model/types"
import { useTagStore } from "../model/store"

interface TagSelectProps {
  tagList: TagType[]
}

export const TagSelect = ({ tagList }: TagSelectProps) => {
  const { selectedTag, setSelectedTag } = useTagStore()
  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        //   fetchPostsByTag(value)
        //   updateURL()
      }}
    >
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
