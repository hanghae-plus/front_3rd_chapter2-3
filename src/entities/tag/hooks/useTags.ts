import { convertToTagOptions } from "@entities/tag/services"
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { fetchTag } from "@entities/tag/api"
import { useEffect, useState } from "react"
import { Tag } from "@entities/tag/types"

export const useTags = () => {
  const location = useLocation()
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [tags, setTags] = useState<Tag[] | null>(null)

  const { data } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: fetchTag,
    enabled: tags === null,
  })

  useEffect(() => {
    if (data && tags === null) setTags(data)
  }, [data, tags])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const selectedTag = params.get("tag") || ""
    setSelectedTag(selectedTag)
  }, [])

  return { tags: data ? convertToTagOptions(data) : [], selectedTag }
}
