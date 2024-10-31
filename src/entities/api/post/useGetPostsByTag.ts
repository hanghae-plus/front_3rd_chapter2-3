import { useQuery } from "@tanstack/react-query"
import usePosts from "../../../features/api/hooks/post/usePosts"
import { Post, User } from "../../../app/type"
import { useAtom } from "jotai"
import { tagAtom } from "../../../app/atom"

export const useGetPostsByTag = () => {
  const { setPosts, setTotal } = usePosts()
  const [tag] = useAtom(tagAtom) // 사용자 ID를 atom에서 가져옵니다.

  // useQuery를 사용하여 태그별 게시물 가져오기
  return useQuery({
    queryKey: ["fetchPostsByTag", tag], // 쿼리 키에 tag 추가
    queryFn: async () => {
      if (!tag || tag === "all") {
        return [] // 태그가 없거나 "all"일 경우 빈 배열 반환
      }

      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error("게시물 또는 사용자 데이터를 가져오는 데 오류가 발생했습니다.")
      }

      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
      return postsWithUsers // 최종 게시물 데이터 반환
    },
    enabled: !!tag && tag !== "all", // tag가 유효할 때만 쿼리 실행
  })
}
