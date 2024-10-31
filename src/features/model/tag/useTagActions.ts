import { useAtom } from "jotai"
import { tagsAtom } from "../../../entities/model/tag/atoms"
import { fetchTags } from "../../../shared/api/tag"

export const useTagActions = () => {
  const [, setTags] = useAtom(tagsAtom)

  const getTags = async () => {
    const newTags = await fetchTags()
    if (newTags) {
      setTags(newTags)
    }
  }

  return { getTags }
}
