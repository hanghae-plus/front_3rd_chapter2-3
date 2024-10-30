import { useAtom } from "jotai"
import { loadingAtom, postsAtom, totalAtom } from "../app/atom"
import { Post, User } from "../app/type"
import { limit, skip } from "../app/util"

const useFetchPosts = () => {
  const [loading, setLoading] = useAtom(loadingAtom)
  const [, setPosts] = useAtom(postsAtom)
  const [, setTotal] = useAtom(totalAtom)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const postsData = await response.json()

      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  return { fetchPosts, loading }
}

export default useFetchPosts
