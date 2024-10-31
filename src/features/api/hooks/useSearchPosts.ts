import { useAtom } from "jotai"
import { searchQueryAtom } from "../../../app/atom"
import usePosts from "./post/usePosts"
import { useQuery } from "@tanstack/react-query"
import { useGetPosts } from "../../../entities/api/post/useGetPosts"

const useSearchPosts = () => {
  const [searchQuery] = useAtom(searchQueryAtom)
  const { setPosts, setTotal } = usePosts()
  const { data: getPosts } = useGetPosts()

  const queryKey = ["searchPosts", searchQuery]

  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!searchQuery) {
        const postsData = await getPosts()
        return postsData // 기본 게시물 반환
      }

      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      if (!response.ok) {
        throw new Error("게시물 검색 오류")
      }
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
      return data.posts // 검색된 게시물 반환
    },
    enabled: !!searchQuery || !!getPosts,
  })

  // 검색Posts 함수 반환
  const searchPosts = () => {
    refetch() // 쿼리 재실행
  }

  return { searchPosts, data, error, isLoading } // 검색 함수와 결과 반환
}

export default useSearchPosts
