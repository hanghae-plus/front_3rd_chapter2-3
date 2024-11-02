import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import SearchBar from "./SearchBar"
import { useTags } from "../../../entities/tag/api/get-tag"

export interface FinderProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  onSearchSubmit: () => void
  onSearchChange: (value: string) => void
  onSelectedTagChange: (value: string) => void
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

const Finder = ({
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  onSearchChange,
  onSearchSubmit,
  onSelectedTagChange,
  onSortByChange,
  onSortOrderChange,
}: FinderProps) => {
  const { data: tags } = useTags()

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <SearchBar value={searchQuery} onChange={onSearchChange} onSubmit={onSearchSubmit} />
      </div>

      <Select value={selectedTag} onValueChange={onSelectedTagChange}>
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
    </div>
  )
}

export default Finder
