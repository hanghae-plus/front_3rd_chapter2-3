import { useTagsQuery } from "../../../../../feature/posts/lib/hooks/usePostsQuery"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../shared"

interface TagSelectProps {
  value: string
  onChange: (value: string) => void
}

export const TagSelect = ({ value, onChange }: TagSelectProps) => {
  const { data: tags } = useTagsQuery()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent className="w-[180px] h-[180px] mt-1 overflow-y-auto">
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.slug} value={tag.slug}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}