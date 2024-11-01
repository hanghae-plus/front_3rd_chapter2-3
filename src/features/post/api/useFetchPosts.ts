import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { useFetchPostsQuery } from "../../../entities/post/api/usePostQuery"
import { usePostStore } from "../../../entities/post/model/postStore"
import { useUsersQuery } from "../../../entities/user/api/useUserQuery"

interface PostWithUser extends Post {
  author?: User
}

const useFetchPosts = () => {
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = usePostStore()
  const { query, addToPostQuery, updatePostQuery, removePostQuery } = useFetchPostsQuery({
    skip,
    limit,
    q: searchQuery,
    sortBy,
    sortOrder,
    tag: selectedTag,
  })
  const { data: simplePosts, isLoading } = query
  const { data: users, isLoading: userIsLoading } = useUsersQuery({ limit: 0, select: "username,image" })
  const posts: PostWithUser[] =
    simplePosts?.posts.map((post) => ({
      ...post,
      author: users?.users.find((user) => user.id === post.userId),
    })) || []
  const total = simplePosts?.total || 0
  const loading = isLoading || userIsLoading

  return {
    posts,
    loading,
    total,
    addToPostQuery,
    updatePostQuery,
    removePostQuery,
  }
}

export default useFetchPosts
