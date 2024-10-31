import { useMutation } from "@tanstack/react-query"
import { putPostFetch } from "../../../entities/post/api"
import { usePost } from "../model/usePost"
import { Post } from "../../../entities/post/model/types"

const useMutationUpdatePost = () => {
  const { posts, setPosts, setShowEditDialog } = usePost()

  return useMutation({
    mutationFn: (selectedPost: Post) => putPostFetch(selectedPost),
    onSuccess: (data) => {
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}

export default useMutationUpdatePost
