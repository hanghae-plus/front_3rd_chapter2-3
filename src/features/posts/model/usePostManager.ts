import { getPosts, getPostsByTag, getSearchPosts } from "../api"
import { getUsers } from "../../users/api"

interface Props {
  limit: number
  skip: number
  searchQuery: string
  selectedTag: string
}

export const usePostManager = ({ limit, skip, searchQuery, selectedTag }: Props) => {
  const { data: posts, isLoading: postsLoading } = getPosts(limit, skip, searchQuery, selectedTag)

  const { data: searchResults } = getSearchPosts(searchQuery)

  const { data: taggedPosts } = getPostsByTag(selectedTag)

  const { data: users } = getUsers()

  return {
    posts,
    postsLoading,
    searchResults,
    taggedPosts,
    users,
  }
}
