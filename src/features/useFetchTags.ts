import { useAtom } from "jotai"
import { useEffect } from "react"
import { tagsAtom } from "../app/atom"

const useFetchTags = () => {
  const [tags, setTags] = useAtom(tagsAtom)

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return tags
}
export default useFetchTags
