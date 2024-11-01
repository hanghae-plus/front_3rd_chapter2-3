import { User } from "../../user/model/type"
import { Post } from "../model/type"

// 게시물 가져오기
export const fetchPosts = (
  limit: number,
  skip: number,
  setLoading: (Loading: boolean) => void,
  setPosts: (posts: Post[]) => void,
  setTotal: (total: number) => void,
) => {
  setLoading(true)
  let postsData: { posts: Post[]; total: number }
  let usersData: User[]

  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      postsData = data
      return fetch("/api/users?limit=0&select=username,image")
    })
    .then((response) => response.json())
    .then((users) => {
      usersData = users.users
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    })
    .catch((error) => {
      console.error("게시물 가져오기 오류:", error)
    })
    .finally(() => {
      setLoading(false)
    })
}

interface PostSearchResponse {
  posts: Post[]
  total: number
}

export const searchPosts = async (
  query: string,
): Promise<PostSearchResponse> => {
  try {
    const response = await fetch(`/api/posts/search?q=${query}`)
    if (!response.ok) {
      throw new Error("Failed to search posts")
    }
    const data = await response.json()
    return {
      posts: data.posts,
      total: data.total,
    }
  } catch (error) {
    console.error("게시물 검색 오류:", error)
    return {
      posts: [],
      total: 0,
    }
  }
}
