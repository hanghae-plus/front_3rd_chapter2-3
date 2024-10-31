import { SelectContent, SelectItem } from "../../shared/ui"
import { useTag } from "../../features/tag/model/store"
import { TagItem } from "../../entities/tag/ui/TagItem"

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
