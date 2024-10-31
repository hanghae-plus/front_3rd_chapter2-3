import { orderBy } from "es-toolkit"
import { useMemo } from "react"
import { Post } from "../../../../entities/post/model/type"
import { useUsers } from "../../../user/api/query"
import { usePostsByTag, useSearchPosts } from "../../api/query"
import { usePostsFilter } from "../hooks/usePostsFilter"

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

export const useFilteredPosts = () => {
  const { selectedTag, sortBy, sortOrder, searchQuery, limit, skip } = usePostsFilter()

  const { data: tagPosts } = usePostsByTag({ tag: selectedTag || "all", limit, skip })
  const { data: searchPosts } = useSearchPosts(searchQuery || "")
  const { data: users } = useUsers()

  const posts = searchQuery ? searchPosts?.posts : tagPosts?.posts
  const sortedPosts = useSortedPosts(posts || [], {
    sortBy: sortBy || "none",
    sortOrder: sortOrder as "asc" | "desc",
  })

  const postsWithUsers = sortedPosts?.map((post) => ({
    ...post,
    author: users?.users.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: searchQuery ? searchPosts?.total : tagPosts?.total,
  }
}
