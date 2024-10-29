import { useEffect, useState } from "react"
import { fetchTagsApi } from "../../../entities/tag/api"
import { Tag } from "../../../entities/tag/model/types"

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const getTags = () => {
    fetchTagsApi().then((data) => setTags(data))
  }

  useEffect(() => {
    getTags()
  }, [])

  return { tags, getTags }
}
