import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select/ui"
import { ParamValue } from "../model/types.ts"
import { useQueryTagList } from "../api/useQueryTagList.ts"
import TagSlugSelectItem from "../../../entities/tag/ui/TagSlugSelectItem.tsx"

interface Props {
  selectedTag: string
  setParam: (key: "selectedTag", value?: ParamValue) => void
}

const TagSelect = ({ selectedTag, setParam }: Props) => {
  const { data } = useQueryTagList()

  return (
    <Select value={selectedTag} onValueChange={(value) => setParam("selectedTag", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        <TagSlugSelectItem tags={data || []} />
      </SelectContent>
    </Select>
  )
}

export default TagSelect
