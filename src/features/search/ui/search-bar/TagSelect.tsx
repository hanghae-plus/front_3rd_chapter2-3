import { Select } from '@shared/ui'
import { SelectLayout } from '@shared/ui'
import { useTags } from '@features/tag/model/hooks'
import { filterStore } from '@features/post/model/stores'

export const TagSelect = () => {
  const { selectedTag, setSelectedTag } = filterStore()
  const { tags } = useTags()

  return (
    <SelectLayout placeholder="태그 선택" value={selectedTag} onValueChange={setSelectedTag}>
      {tags.map((tag) => (
        <Select.Item key={tag.url} value={tag.slug}>
          {tag.slug}
        </Select.Item>
      ))}
    </SelectLayout>
  )
}
