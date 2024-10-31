import { useEffect } from "react"
import { fetchTags } from "../api/tag"
import { Tag } from "../types"
import { atom, useAtom } from "jotai"
interface UseTagsProps {
  tags: Tag[]
  getTags: () => Promise<void>
}

const tagsAtom = atom<Tag[]>([])
export const useTags = (): UseTagsProps => {
  const [tags, setTags] = useAtom(tagsAtom)

  const getTags = async () => {
    const newTags = await fetchTags()
    if (newTags) {
      setTags(newTags)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return { tags, getTags }
}
