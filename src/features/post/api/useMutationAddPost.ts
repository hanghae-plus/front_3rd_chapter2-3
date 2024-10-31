import { useMutation } from "@tanstack/react-query"
import { postPostFetch } from "../../../entities/post/api"
import { usePost } from "../model/usePost"

const useMutationAddPost = () => {
  const { posts, setPosts, setShowAddDialog, newPost, setNewPost } = usePost()
  return useMutation({
    mutationFn: () => postPostFetch(newPost),
    onSuccess: (data) => {
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })
}

export default useMutationAddPost
