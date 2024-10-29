import { atom, useAtom } from "jotai"
import { Tag } from "./types"

const queryParams = new URLSearchParams(location.search)
const tagsAtom = atom<Tag[]>([])
const selectedTagAtom = atom(queryParams.get("tag") || "")

export const useTag = () => {
  const [tags, setTags] = useAtom(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return new (class {
    tags = tags
    setTags = setTags
    selectedTag = selectedTag
    setSelectedTag = setSelectedTag
  })()
}
