import { useEffect, useState } from "react"
import { fetchTags } from "../api/tag"
import { Tag } from "../types"

interface UseTagsProps {
  tags: Tag[]
  getTags: () => Promise<void>
}

export const useTags = (): UseTagsProps => {
  const [tags, setTags] = useState<Tag[]>([])

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
