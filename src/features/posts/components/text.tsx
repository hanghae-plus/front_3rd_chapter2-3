import { useEffect, useState } from "react"
import { Input } from "../../../shared/ui/"
import usePost from "../hooks/usePost"
import { useFetchPosts, useFetchPostsByTag } from "../api/postFeatureApi"
import { Post, Posts } from "../../../entities/posts/model/Post"
import { Users } from "../../../entities/users/model/User"

const PostSearchInput = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    limit,
    skip,
    selectedPost,
    setLoading,
    setPosts,
    setTotal,
    updateURL,
    sortBy,
    sortOrder,
  } = usePost()

  const { data: postsByTag, isLoading: isPostByTagLoading, isError: isPostByTagError } = useFetchPostsByTag(selectedTag)
  const { postsByTagData, usersByTagData } = postsByTag || { postsByTagData: [], usersByTagData: [] }

  const { data: postSearch, isLoading: isPostSearchLoading, isError: isPostSearchError } = useFetchPosts(limit, skip)
  //const { postsSearchData, usersSearchData } = postSearch || { postsSearchData: [], usersSearchData: [] }

  const [search, setSearch] = useState(false)
  function postsToUsers(postsData: Posts, users: Users[]): Posts {
    return {
      ...postsData,
      posts: postsData.posts.map((post: Post) => ({
        ...post,
        author: users.find((user: Users) => user.id === post.userId),
      })),
    }
  }

  function handleSearch() {
    setSearch(!search)
  }

  useEffect(() => {
    setLoading(true)

    const loadPosts = async () => {
      if (selectedTag) {
        if (!isPostByTagLoading && !isPostByTagError && postsByTagData && usersByTagData) {
          const postsWithUsers = postsToUsers(postsByTagData, usersByTagData.users)
          console.log("postsByTagData", postsByTagData)
          setPosts(postsWithUsers)
          setTotal(postsByTagData.total)
          updateURL()
        }
      } else {
        if (!isPostSearchLoading && !isPostSearchError && postsSearchData && usersSearchData) {
          const postsWithUsers = postsToUsers(postsSearchData, usersSearchData.users)
          console.log("postsSearchData", postsSearchData)
          setPosts(postsWithUsers)
          setTotal(postsSearchData.total)
        }
      }
    }

    loadPosts().finally(() => setLoading(false))
  }, [search, skip, limit, sortBy, sortOrder, selectedTag])

  function handleChangeSearchQuery(value: string) {
    setSearchQuery(value)
  }

  return (
    <Input
      placeholder="Search posts..."
      className="pl-8"
      value={searchQuery}
      onChange={(e) => handleChangeSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch}
    />
  )
}

export default PostSearchInput
