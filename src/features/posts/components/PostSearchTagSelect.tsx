import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import usePost from "../hooks/usePost"
import { useFetchTags } from "../api/postFeatureApi"

const PostSearchTagSelect = () => {
  const { selectedTag, setSelectedTag, tags, setTags } = usePost()

  function handleChangeSelecteTag(value: string) {
    setSelectedTag(value)
  }

  const { data, isLoading, isError } = useFetchTags()

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setTags(data)
    }
  }, [data, isLoading, isError, setTags])

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        handleChangeSelecteTag(value)
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

export default PostSearchTagSelect
