import { orderBy } from "es-toolkit"
import { useMemo } from "react"
import { Post } from "../../../../entities/post/model/type"

export const useSortedPosts = (posts: Post[], sortConfig: { sortBy: string; sortOrder: "asc" | "desc" }) => {
  return useMemo(() => {
    if (!posts || !sortConfig.sortBy || sortConfig.sortBy === "none") {
      return posts
    }

    const iteratee = (post: Post) => {
      if (sortConfig.sortBy === "reactions") {
        return (post.reactions?.likes || 0) - (post.reactions?.dislikes || 0)
      }
      return post[sortConfig.sortBy as keyof Post]
    }

    return orderBy(posts, [iteratee], [sortConfig.sortOrder || "asc"])
  }, [posts, sortConfig.sortBy, sortConfig.sortOrder])
}
