import { useParam } from "../../shared/model/useParam"
import { useUpdateURL } from "../../shared/model/useUpdateURL"
export function TagItem({ tag }: { tag: string }) {
  const { selectedTag, setSelectedTag } = useParam()
  const updateURL = useUpdateURL()
  return (
    <span
      key={tag}
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
