import { useMutation } from "@tanstack/react-query"
import { usePost } from "../../../entities/post/model/post"
import { deletePost } from "../../../entities/post/api"

export function useQueryDeletePost() {
  // entities
  const { posts, setPosts } = usePost()

  // query
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (postId) => {
      setPosts(posts.filter((post) => post.id !== postId))
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
