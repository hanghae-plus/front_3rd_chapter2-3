import { Post } from "@entities/post/model"

export const updatePostApi = async (
  selectedPost: Partial<Post>,
): Promise<Post> => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    return (await response.json()) as Post
  } catch (e) {
    throw new Error("Failed to update post" + e)
  }
}
