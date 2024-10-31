import { Post } from "../types/types"

export const PostUpdate = async (selectedPost: Partial<Post>): Promise<Post> => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    return await response.json()
  } catch (error) {
    throw new Error("게시물 업데이트 오류" + error)
  }
}
