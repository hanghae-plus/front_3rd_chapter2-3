import { PostModel } from "./PostMoel"

export const fetchPosts = async (): Promise<PostModel[]> => {
  const response = await fetch("/api/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}
