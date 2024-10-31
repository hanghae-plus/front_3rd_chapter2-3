import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostTagSelectProps {
  value: string
  tags: Array<{ url: string; slug: string }>
  onChange: (value: string) => void
}

export const PostTagSelect = ({ value, tags, onChange }: PostTagSelectProps) => (
  <Select value={value} onValueChange={onChange}>
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
