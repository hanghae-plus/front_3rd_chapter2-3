import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostParamsContext } from "../../post/model/PostParamsContext"
import { useTags } from "../../tag/model/useTags"

interface Props {
  handleGetPostsByTag: (value: string) => void
}

export const SelectTag = ({ handleGetPostsByTag }: Props) => {
  const { selectedTag, setSelectedTag, setSkip, updateURL } = usePostParamsContext()
  const { tags } = useTags()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        handleGetPostsByTag(value)
        setSkip(0)
        updateURL()
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
