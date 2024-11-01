import { Search } from "lucide-react"
import { Input } from "../../../../shared/ui/input"
import { Select } from "../../../../shared/ui/select"
import { useTags } from "../../../tag/api/query"
import { usePostsFilter } from "../../model/hooks/usePostsFilter"

export const PostsFilterControls = () => {
  const { data: tags } = useTags()
  const {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    onSearchChange,
    onTagChange,
    onSortByChange,
    onSortOrderChange,
  } = usePostsFilter()

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
      <Select
        value={selectedTag}
        onValueChange={onTagChange}
        placeholder="태그 선택"
        options={[
          { value: "all", label: "모든 태그" },
          ...(tags?.map((tag) => ({ value: tag.slug, label: tag.slug })) || []),
        ]}
      />
      <Select
        value={sortBy}
        onValueChange={onSortByChange}
        placeholder="정렬 기준"
        options={[
          { value: "none", label: "없음" },
          { value: "id", label: "ID" },
          { value: "title", label: "제목" },
          { value: "reactions", label: "반응" },
        ]}
      />
      <Select
        value={sortOrder}
        onValueChange={onSortOrderChange}
        placeholder="정렬 순서"
        options={[
          { value: "asc", label: "오름차순" },
          { value: "desc", label: "내림차순" },
        ]}
      />
    </div>
  )
}
