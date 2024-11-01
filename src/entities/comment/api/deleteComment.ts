import { fetchComment } from "./fetchComment"

export const deleteCommentApi = async (id: number) => {
  await fetchComment(`/api/comments/${id}`, { method: "DELETE" })
  return id
}
