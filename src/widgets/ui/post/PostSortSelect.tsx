import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostSortSelectProps {
  sortBy: string
  sortOrder: string
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

export const PostSortSelect = ({ sortBy, sortOrder, onSortByChange, onSortOrderChange }: PostSortSelectProps) => (
  <>
    <Select value={sortBy} onValueChange={onSortByChange}>
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

    <Select value={sortOrder} onValueChange={onSortOrderChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  </>
)
