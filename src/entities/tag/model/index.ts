import { useState } from "react"
import { fetchTagsApi } from "../api"

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([])

  const getTags = () => {
    fetchTagsApi().then((data) => setTags(data))
  }

  return { tags, getTags }
}
