import { Post } from "../../../entities/Post/model/types"
import { User } from "../../../entities/User/model/types"
import { usePostStore } from "../model/stores/usePostStore"
import { usePostService } from "../model/services/usePostService"

export const useFetchPostsByTag = () => {
  const { setPosts, setTotal, setLoading } = usePostStore()
  const postService = usePostService()

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      postService.fetchPosts({ skip: 0, limit: 10, sortBy: "createdAt", sortOrder: "desc" })
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }

    setLoading(false)
  }

  return fetchPostsByTag
}
