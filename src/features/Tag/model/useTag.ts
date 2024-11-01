import { atom, useAtom } from "jotai"
import { Tag } from "../../../shared/type"

const tagsAtom = atom<Tag[]>([])

export const useTag = () => {
  const [tags, setTags] = useAtom(tagsAtom)

  return {
    tags,
    setTags,
  }
}
