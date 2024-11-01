import { useEffect, useState } from "react"

import { Tag } from "../../../entities/post/model/types"

import { postApi } from "../../../entities/post/api/postApi"

export const useFetchTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const fetchTags = async () => {
    try {
      const data = await postApi.fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return { tags, fetchTags }
}
