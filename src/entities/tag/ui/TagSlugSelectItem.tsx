import { Tag } from "../model/types.ts"
import { SelectItem } from "../../../shared/ui/select/ui"

interface Props {
  tags: Tag[]
}

const TagSlugSelectItem = ({ tags }: Props) => {
  return (
    <>
      {tags.map((tag) => (
        <SelectItem key={tag.url} value={tag.slug}>
          {tag.slug}
        </SelectItem>
      ))}
    </>
  )
}

export default TagSlugSelectItem
