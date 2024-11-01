import { fetchComment } from "@entities/comment/api/fetchComment"
import { Comment } from "@entities/comment/types"

export const updateCommentApi = async (comment: Comment) => {
  return await fetchComment(`/${comment.id}`, {
    method: "PUT",
    body: JSON.stringify({ body: comment.body, likes: comment.likes }),
  })
}

export const likeCommentApi = async (comment: Comment) => {
  const { id, likes } = comment
  return await fetchComment(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ likes }),
  })
}
