import { Key } from "react"
import { TagName } from "../../../entities/tag/model/type"
import { useSearch } from "../../../shared/model/useSearch"

export const PostTag = ({ tag }: { key: Key; tag: TagName }) => {
  const { selectedTag, setSelectedTag, updateURL } = useSearch()
  return (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => {
        setSelectedTag(tag)
        updateURL()
      }}
    >
      {tag}
    </span>
  )
}
