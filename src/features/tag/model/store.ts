import { useEffect, useState } from "react"
import { fetchTagsApi } from "../../../entities/tag/api"
import { Tag } from "../../../entities/tag/model/type"
import { atom, useAtom } from "jotai"

export const tagAtom = atom<Tag[]>([])

export const useTag = () => {
  const [tags, setTags] = useAtom<Tag[]>(tagAtom)

  // 태그 가져오기
  const fetchTags = async () => {
    const data = await fetchTagsApi()
    setTags(data)
  }

  useEffect(() => {
    fetchTags()
  }, [])
  return {
    tags,
    setTags,
  }
}
