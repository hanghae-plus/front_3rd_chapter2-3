import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostParamsStore } from "../../post/model/postParamsStore"
import { usePostQueryStore } from "../../post/model/postQueryStore"
import { useTags } from "../../tag/model/useTags"

export const TagSelect = () => {
  const { selectedTag, setSelectedTag, setSkip, updateURL } = usePostParamsStore()
  const { tags } = useTags()
  const { setActiveQuery } = usePostQueryStore()

  const handleGetPostsByTag = (tag: string) => {
    setActiveQuery("tag")
    setSelectedTag(tag)
    setSkip(0)
    updateURL()
  }

  return (
    <Select value={selectedTag} onValueChange={handleGetPostsByTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.slug} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
