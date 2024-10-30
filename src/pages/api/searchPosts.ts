import { fetchPostsBySearchFetch } from "../../entities/post/api"
import { Post } from "../../entities/post/model/types"
import { fetchPosts } from "./fetchPosts"

interface Props {
  searchQuery: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  limit: number
  skip: number
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
}

// 게시물 검색
export const searchPosts = async ({ searchQuery, setLoading, limit, skip, setPosts, setTotal }: Props) => {
  if (!searchQuery) {
    fetchPosts({ setLoading, limit, skip, setPosts, setTotal })
    return
  }
  setLoading(true)
  try {
    const data = await fetchPostsBySearchFetch(searchQuery)
    setPosts(data.posts)
    setTotal(data.total)
  } catch (error) {
    console.error("게시물 검색 오류:", error)
  }
  setLoading(false)
}
