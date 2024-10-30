import { Key } from "react"
import { SelectContent, SelectItem } from "../../shared/ui"
import { Tag } from "../../entities/tag/model/type"
import { useTag } from "../../features/tag/model/store"

export const TagSelect = () => {
  const { tags } = useTag()
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
