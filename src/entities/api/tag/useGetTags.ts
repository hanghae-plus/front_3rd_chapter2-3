import { useAtom } from "jotai"
import { useQuery } from "@tanstack/react-query"
import { tagsAtom } from "../../../app/atom"

// 태그 타입 정의
interface Tag {
  id: number
  url: string
  slug: string
}

const useGetTags = () => {
  const [, setTags] = useAtom(tagsAtom)

  return useQuery<Tag[]>({
    queryKey: ["tags"], // 쿼리 키 설정
    queryFn: async () => {
      const response = await fetch("/api/posts/tags")
      if (!response.ok) {
        throw new Error("태그 가져오기 오류")
      }
      const data = await response.json()
      setTags(data)
      return data
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  })
}

export default useGetTags
