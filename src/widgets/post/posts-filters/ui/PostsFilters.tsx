import { type FC } from "react"
import { useAtom } from "jotai"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/components/select"
import { SearchBar } from "@/features/post/post-search/ui/SearchBar"
import { postsManagerState } from "@/pages/posts-manager/model/store"
import { useTags } from "@/shared/api/posts"

export const PostsFilters: FC = () => {
  const [state, setState] = useAtom(postsManagerState)
  const { data: tags } = useTags()

  const handleSearch = (value: string) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, search: value },
      pagination: { ...prev.pagination, currentPage: 1 },
    }))
  }

  const handleTagChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, tag: value },
      pagination: { ...prev.pagination, currentPage: 1 },
    }))
  }

  const handleSortByChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, sortBy: value },
    }))
  }

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, sortOrder: value },
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchBar value={state.filters.search} onChange={handleSearch} onSearch={() => {}} />
          </div>
        </div>
        <Select value={state.filters.tag} onValueChange={handleTagChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 태그</SelectItem>
            {tags?.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={state.filters.sortBy} onValueChange={handleSortByChange}>
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
        <Select value={state.filters.sortOrder} onValueChange={handleSortOrderChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">오름차순</SelectItem>
            <SelectItem value="desc">내림차순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
