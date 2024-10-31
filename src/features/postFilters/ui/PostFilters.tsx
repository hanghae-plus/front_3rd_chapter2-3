// src/features/postFilters/ui/PostFilters.tsx
import { useEffect, useState } from "react"
import { postsAPI, Tag, usePostsStore } from "../../../entities/post"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostFiltersProps {
  onChange: (tag: string) => void
}

export const PostFilters = ({ onChange }: PostFiltersProps) => {
  const [tags, setTags] = useState<Tag[]>([])
  const { selectedTag, sortBy, sortOrder, setSortBy, setSortOrder } = usePostsStore()

  useEffect(() => {
    const fetchTags = async () => {
      const tagList = await postsAPI.getTags()
      setTags(tagList)
    }
    fetchTags()
  }, [])

  return (
    <div className="flex gap-4">
      <Select value={selectedTag} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.slug} value={tag.slug}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
