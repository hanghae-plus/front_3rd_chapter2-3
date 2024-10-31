import { useUsers } from "../../../user/api/query"
import { usePostsByTag, useSearchPosts } from "../../api/query"
import { usePostsFilter } from "./usePostsFilter"
import { useSortedPosts } from "./useSortedPosts"

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
