import { Post, PostForm } from "../types/types"

export const postCreate = async (newPost: PostForm): Promise<Post> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })

    return (await response.json()) as Post
  } catch (e) {
    throw new Error("게시물 추가 오류:" + e)
  }
}
