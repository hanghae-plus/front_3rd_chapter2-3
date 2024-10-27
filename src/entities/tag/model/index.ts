import { useState } from "react"
import { fetchTags } from "../api"

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([])

  const getTags = () => {
    fetchTags().then((data) => setTags(data))
  }

  return { tags, getTags }
}
