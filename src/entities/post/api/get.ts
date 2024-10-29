import { UserResponse } from "../../user"
import { PostsResponse, PostWithUser } from "../type"

// 게시물 가져오기
export const fetchPosts = () => {
  setLoading(true)
  let postsData: PostsResponse
  let usersData: UserResponse

  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data: PostsResponse) => {
      postsData = data
      return fetch("/api/users?limit=0&select=username,image")
    })
    .then((response) => response.json())
    .then((users: UserResponse) => {
      usersData = users
      const postsWithUsers: PostWithUser[] = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId)!,
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

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag: string) => {
  if (!tag || tag === "all") {
    fetchPosts()
    return
  }
  setLoading(true)
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    const postsData: PostsResponse = await postsResponse.json()
    const usersData: UserResponse = await usersResponse.json()

    const postsWithUsers: PostWithUser[] = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId)!,
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error)
  }
  setLoading(false)
}
