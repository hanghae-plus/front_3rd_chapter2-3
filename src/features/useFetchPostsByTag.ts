import { useAtom } from "jotai"
import { loadingAtom } from "../app/atom"
import useFetchPosts from "./useFetchPosts"
import usePosts from "./usePosts"
import { Post, User } from "../app/type"

const useFetchPostsByTag = () => {
  const [, setLoading] = useAtom(loadingAtom)
  const { fetchPosts } = useFetchPosts()
  const { setPosts, setTotal } = usePosts()

  const fetchPostsByTag = async (tag: string) => {
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
    } finally {
      setLoading(false)
    }
  }

  return { fetchPostsByTag } // fetchPostsByTag 함수를 반환
}

export default useFetchPostsByTag
