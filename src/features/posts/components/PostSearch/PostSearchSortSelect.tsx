import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui"
import usePost from "../../../../shared/hooks/usePost"

const PostSearchSortSelect = () => {
  const { sortBy, setSortBy, sortOrder, setSortOrder } = usePost()

  function handleChangeSortBy(value: string) {
    setSortBy(value)
  }

  function handleChangeSortOrder(value: string) {
    setSortOrder(value)
  }
  return (
    <div className="flex gap-4">
      <Select value={sortBy} onValueChange={(value) => handleChangeSortBy(value)}>
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
      <Select value={sortOrder} onValueChange={(value) => handleChangeSortOrder(value)}>
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
