import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { PostFiltersState } from "../model/types"
import { usePostFilters } from "../model/usePostFilters"

interface PostFiltersProps {
  tags: string[]
  onChange: (filters: PostFiltersState) => void
}

export const PostFilters = ({ tags, onChange }: PostFiltersProps) => {
  const { filters, updateFilter } = usePostFilters()

  const handleFilterChange = <K extends keyof PostFiltersState>(key: K, value: PostFiltersState[K]) => {
    updateFilter(key, value)
    onChange(filters)
  }

  return (
    <div className="flex gap-4">
      <Select value={filters.selectedTag} onValueChange={(value) => handleFilterChange("selectedTag", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sortOrder}
        onValueChange={(value) => handleFilterChange("sortOrder", value as "asc" | "desc")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
