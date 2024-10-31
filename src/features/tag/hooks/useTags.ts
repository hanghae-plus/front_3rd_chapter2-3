import { useQueryTags } from "@features/tag/api"
import { useLocation } from "react-router-dom"
import { useEffect, useState, useMemo } from "react"
import { Tag } from "../model"

export const useTags = () => {
  const location = useLocation()
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [tags, setTags] = useState<Tag[] | null>(null)
  const { data } = useQueryTags()

  useEffect(() => {
    if (data && tags === null) setTags(data)
  }, [data, tags])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const selectedTag = params.get("tag") || ""
    setSelectedTag(selectedTag)
  }, [])

  const tagOptions = useMemo(() => {
    if (!data) return []
    
    return [
      { id: -1, value: "all", label: "모든 태그" },
      ...data.map((tag: { slug: string }, idx) => ({
        id: idx,
        label: tag.slug,
        value: tag.slug,
      })),
    ]
  }, [data])

  return { tags: tagOptions, selectedTag }
}
