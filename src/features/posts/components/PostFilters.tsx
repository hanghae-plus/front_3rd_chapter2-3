import { Search } from 'lucide-react'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui'
import { Tag } from '../../../entity/tag/model'

interface PostFiltersProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  tags: Tag[]
  onSearch: (query: string) => void
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: string) => void
  onSortOrderChange: (order: string) => void
}

export const PostFilters = ({
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  tags,
  onSearch,
  onTagChange,
  onSortByChange,
  onSortOrderChange
}: PostFiltersProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch(searchQuery)}
          />
        </div>
      </div>
      <Select value={selectedTag} onValueChange={onTagChange}>
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
