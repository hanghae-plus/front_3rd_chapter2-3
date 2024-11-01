import { Post, PostsResponse } from "./types"

/** 게시물 리스트 업데이트 로직 */
export const updatePostsList = (
  oldData: PostsResponse | undefined,
  post: Post,
  operation: "add" | "delete" | "update",
): PostsResponse | undefined => {
  const posts = oldData?.posts ?? []
  const total = oldData?.total ?? 0

  switch (operation) {
    case "add":
      return {
        posts: [post, ...posts],
        total: total + 1,
      }
    case "delete":
      return {
        posts: posts.filter((p) => p.id !== post.id),
        total: total - 1,
      }
    case "update":
      return {
        posts: posts.map((p) => (p.id === post.id ? { ...p, ...post } : p)),
        total,
      }
    default:
      return oldData
  }
}
