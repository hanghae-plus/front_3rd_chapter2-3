import { useMutation } from "@tanstack/react-query"
import { deletePostFetch } from "../../../entities/post/api"
import { usePost } from "../model/usePost"

const useMutationDeletePost = (id: number) => {
  const { posts, setPosts } = usePost()

  return useMutation({
    mutationFn: () => deletePostFetch(id),
    onSuccess: () => {
      setPosts(posts.filter((post) => post.id !== id))
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}

export default useMutationDeletePost
