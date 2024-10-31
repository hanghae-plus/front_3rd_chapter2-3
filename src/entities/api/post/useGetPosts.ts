import { useAtom } from "jotai"
import { postsAtom, totalAtom } from "../../../app/atom"
import { Post, User } from "../../../app/type"
import { useQuery } from "@tanstack/react-query"

export const useGetPosts = (limit?: string | number, skip?: string | number) => {
  const [, setPosts] = useAtom(postsAtom)
  const [, setTotal] = useAtom(totalAtom)

  return useQuery({
    queryKey: ["getPosts", limit, skip],
    queryFn: async () => {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      if (!response.ok) throw new Error("게시물 가져오기 오류")
      const postsData = await response.json()

      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
      return postsWithUsers
    },
  })
}
