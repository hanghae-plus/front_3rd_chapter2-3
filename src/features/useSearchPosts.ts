// useSearchPosts.ts
import { useAtom } from "jotai"
import useFetchPosts from "./useFetchPosts"
import { loadingAtom, searchQueryAtom } from "../app/atom"
import usePosts from "./usePosts"

const useSearchPosts = () => {
  const [, setLoading] = useAtom(loadingAtom)
  const [searchQuery] = useAtom(searchQueryAtom)
  const { fetchPosts } = useFetchPosts()
  const { setPosts, setTotal } = usePosts()

  const searchPosts = async () => {
    if (!searchQuery) {
      await fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  return { searchPosts }
}

export default useSearchPosts
