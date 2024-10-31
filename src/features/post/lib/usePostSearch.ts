import { fetchPosts, searchPosts } from "../../../entities/post/api/post"
import { Post } from "../../../entities/post/model/post"

interface UsePostSearchProps {
  limit: number
  skip: number
  setLoading: (loading: boolean) => void
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
}

export const usePostSearch = ({
  limit,
  skip,
  setLoading,
  setPosts,
  setTotal,
}: UsePostSearchProps) => {
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      fetchPosts(limit, skip, setLoading, setPosts, setTotal)
      return
    }

    setLoading(true)
    try {
      const { posts, total } = await searchPosts(searchQuery)
      setPosts(posts)
      setTotal(total)
    } finally {
      setLoading(false)
    }
  }

  return handleSearch
}
