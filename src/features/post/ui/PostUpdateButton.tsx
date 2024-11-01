import { Post } from "../../../entities/post/model/types"
import { Button } from "../../../shared/ui"
import { useUpdatePostMutation } from "../api/useUpdatePostMutation"

type Props = {
  selectedPost: Post | null
  onUpdateSuccess?: VoidFunction
}

export const PostUpdateButton = ({
  selectedPost,
  onUpdateSuccess: onSuccess,
}: Props) => {
  const { mutate: updatePostMutate } = useUpdatePostMutation()

  const updatePost = (selectedPost: Post | null) => {
    if (!selectedPost) return
    updatePostMutate(selectedPost, { onSuccess })
  }

  return (
    <Button onClick={() => updatePost(selectedPost)}>게시물 업데이트</Button>
  )
}
