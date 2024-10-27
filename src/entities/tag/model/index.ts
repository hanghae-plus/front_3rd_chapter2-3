import { useState } from "react"
import { fetchTagsApi } from "../api"
import { Tag } from "./types"

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const getTags = () => {
    fetchTagsApi().then((data) => setTags(data))
  }

  return { tags, getTags }
}
