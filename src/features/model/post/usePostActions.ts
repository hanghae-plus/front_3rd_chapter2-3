import { useAtom } from "jotai"
import { showAddDialogAtom } from "../../../entities/model/post/atoms"
import { usePostMutations } from "../../../entities/api/post/usePostQuery"
import type { NewPost, Post } from "../../../shared/types"

export const usePostActions = () => {
  const [, setShowAddDialog] = useAtom(showAddDialogAtom)

  const { addPostMutation, updatePostMutation, deletePostMutation } = usePostMutations()

  const handleAddPost = async (newPost: NewPost) => {
    const result = await addPostMutation.mutateAsync(newPost)
    if (result) {
      setShowAddDialog(false)
      return result
    }
  }

  const handleUpdatePost = async (post: Post) => {
    const result = await updatePostMutation.mutateAsync(post)
    return result
  }

  const handleDeletePost = async (id: number) => {
    const success = await deletePostMutation.mutateAsync(id)
    return success
  }

  return {
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
  }
}
