import { Post, PostForm } from "@entities/post/types"
import { fetchPost } from "./fetchPost"

// 게시물 생성
export const createPostApi = async (newPost: PostForm): Promise<Post> => {
  return await fetchPost("/add", {
    method: "POST",
    body: newPost,
  })
}
