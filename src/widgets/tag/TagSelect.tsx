import { Key, useEffect, useState } from "react"
import { fetchTagsApi } from "../../entities/tag/api"
import { SelectContent, SelectItem } from "../../shared/ui"
import { Tag } from "../../entities/tag/model/type"

export const TagSelect = () => {
  const [tags, setTags] = useState<Tag[]>([])

  // 태그 가져오기
  const fetchTags = async () => {
    const data = await fetchTagsApi()
    setTags(data)
  }

  useEffect(() => {
    fetchTags()
  }, [])
  return (
    <SelectContent>
      <SelectItem value="all">모든 태그</SelectItem>
      {tags.map((tag) => (
        <TagItem tag={tag} key={tag.url} />
      ))}
    </SelectContent>
  )
}
export const TagItem = ({ tag }: { key: Key; tag: Tag }) => <SelectItem value={tag.slug}>{tag.slug}</SelectItem>
