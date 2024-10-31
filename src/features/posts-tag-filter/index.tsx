import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAtom } from "jotai"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { tagAtom, useQueryTags } from "@/entities/tag"
import { postsAtom, useQueryPostsByTag } from "@/entities/post"
import { Tag } from "@/shared/types"

export const PostsTagFilter = () => {
  const { data: tagsData } = useQueryTags()
  const [selectedTag, setSelectedTag] = useState("all")
  const { data: postsData } = useQueryPostsByTag(selectedTag)
  const [params, setParams] = useSearchParams()
  const [, setTag] = useAtom(tagAtom)
  const [, setPosts] = useAtom(postsAtom)

  useEffect(() => {
    const tagParam = params.get("tag")
    if (tagParam) {
      if (tagParam === "all") {
        params.delete("tag")
        setParams(params)
      }
      if (postsData) setPosts(postsData)
    }
  }, [params, postsData, setPosts, setParams])

  const handleSelectTag = (value: string) => {
    setSelectedTag(value)
    setTag(value)
    setParams({ tag: value })
  }

  return (
    <Select value={selectedTag} onValueChange={handleSelectTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tagsData?.map((tag: Tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
