import { Search } from "lucide-react"
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../shared"
import { TagSelect } from "../../../../../entities/post/ui/components/PostFilters/TagSelect"
import { SortSelect } from "../../../../../entities/post/ui/components/PostFilters/SortSelect"
import { SORT_ORDER_LABELS, SORT_ORDERS } from "../../../../../entities/post/model/constants"

interface PostFiltersProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  onSearchChange: (value: string) => void
  onTagChange: (value: string) => void
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

export const PostFilters = ({
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  onSearchChange,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <TagSelect value={selectedTag} onChange={onTagChange} />
      <SortSelect value={sortBy} onChange={onSortByChange} />

      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent className="w-[180px] mt-1">
          {Object.entries(SORT_ORDERS).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {SORT_ORDER_LABELS[value]}
              </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
