import { Search } from "lucide-react"
import { UpdatePostQueryParam } from "../../../entities/post"
import { usePostTagsQuery } from "../../../entities/post/api/usePostTagsQuery"
import { SortOrder, SortType } from "../../../shared/model/types"
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui"

type Props = SortType & {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  updateQueryParam: UpdatePostQueryParam

  selectedTag: string
}

export const PostFilterBar = ({
  searchQuery,
  setSearchQuery,
  updateQueryParam,

  selectedTag,
  sortBy,
  sortOrder,
}: Props) => {
  const { data: tags = [] } = usePostTagsQuery()

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateQueryParam({ search: searchQuery })
              }
            }}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          updateQueryParam({ tag: value })
        }}
      >
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
      <Select
        value={sortBy}
        onValueChange={(value) => updateQueryParam({ sortBy: value })}
      >
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
        value={sortOrder}
        onValueChange={(value) =>
          updateQueryParam({ sortOrder: value as SortOrder })
        }
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
