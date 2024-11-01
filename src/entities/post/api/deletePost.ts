import { fetchPost } from "./fetchPost"

/** 게시물 삭제 */
export const deletePostApi = async (id: number): Promise<number> => {
  await fetchPost(`/${id}`, { method: "DELETE" })
  return id
}
