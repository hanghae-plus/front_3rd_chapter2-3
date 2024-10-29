import { useEffect, useState } from "react"
import { Tag } from "../../../entities/tag/model/types"
import { fetchTagsApi } from "../../../entities/tag/api"

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const getTags = async () => {
    const tagsData = await fetchTagsApi()

    setTags(tagsData)
  }

  useEffect(() => {
    getTags()
  }, [])

  return { tags, getTags }
}
