import { Post, PostForm } from "@entities/post/model"

export const createPostApi = async (newPost: PostForm): Promise<Post> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 추가 오류:", error)
    throw new Error(`게시물 추가 오류: ${error}`)
  }
}
