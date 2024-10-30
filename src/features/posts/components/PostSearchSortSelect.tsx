import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostSearchSortSelectProps {
  sortBy: string
  setSortBy: (value: string) => void
  sortOrder: string
  setSortOrder: (value: string) => void
}

const PostSearchSortSelect = ({ sortBy, setSortBy, sortOrder, setSortOrder }: PostSearchSortSelectProps) => {
  return (
    <div className="flex gap-4">
      <Select value={sortBy} onValueChange={setSortBy}>
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
      <Select value={sortOrder} onValueChange={setSortOrder}>
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

export default PostSearchSortSelect
