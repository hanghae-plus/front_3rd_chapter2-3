import { SelectValue } from '@radix-ui/react-select';

import { Tag } from '../../../../entities';
import { useTagsQuery } from '../../../../entities/tag/queries/useTagQuries';
import { Select } from '../../../../shared/ui/molecules/Select';
import SelectContent
  from '../../../../shared/ui/molecules/Select/ui/SelectContent';
import SelectItem from '../../../../shared/ui/molecules/Select/ui/SelectItem';
import SelectTrigger
  from '../../../../shared/ui/molecules/Select/ui/SelectTrigger';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';

const TagFilter = () => {
  const { tag, setTag } = useSearchStore()
  const { data: tags } = useTagsQuery()

  if (!tags) return null

  return (
    <>
      <Select
        value={tag}
        onValueChange={(value) => {
          setTag(value)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags &&
            tags.length &&
            tags?.map((tag: Tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default TagFilter
