import { atom, useAtom } from "jotai"
import useQueryParams from "../../../app/lib/params"

// interface
interface Tag {
  slug: string
  name: string
  url: string
}

// useSelectedTag
const { selectedTag: initialSelectedTag } = useQueryParams()
const selectedTagAtom = atom<string>(initialSelectedTag)

export const useSelectedTag = () => {
  const [selectedTag, setSelectedTag] = useAtom<string>(selectedTagAtom)

  return new (class {
    selectedTag = selectedTag
    setSelectedTag = setSelectedTag
  })()
}

// useTags
const tagsAtom = atom<Tag[]>([])

export const useTags = () => {
  const [tags, setTags] = useAtom<Tag[]>(tagsAtom)

  return new (class {
    tags = tags
  })()
}
