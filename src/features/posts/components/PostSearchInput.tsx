import { useEffect, useState } from "react"
import { Input } from "../../../shared/ui/"
import usePost from "../hooks/usePost"
import { useFetchPosts, useFetchPostsByTag, useFetchSearchQueryPosts } from "../api/postFeatureApi"
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
  const { data: postsByTag, isLoading: isPostByTagLoading, isError: isPostByTagError } = useFetchPostsByTag(selectedTag)
  const { data: postSearch, isLoading: isPostSearchLoading, isError: isPostSearchError } = useFetchPosts(limit, skip)
  const {
    data: searchQeuryPost,
    isLoading: isSearchQeuryPostLoading,
    isError: isSearchQeuryPostError,
  } = useFetchSearchQueryPosts(searchQuery)

  function fetchPostsData() {
    setLoading(true)
    const isTagSearch = selectedTag && selectedTag !== "all"
    const isSearchReady = !isTagSearch
      ? !isPostSearchLoading && !isPostSearchError && postSearch
      : !isPostByTagLoading && !isPostByTagError && postsByTag

    if (isSearchReady) {
      const postsData = isTagSearch ? postsByTag?.postsByTagData : postSearch?.postsSearchData
      const usersData = isTagSearch ? postsByTag?.usersByTagData : postSearch?.usersSearchData

      if (postsData && usersData) {
        const postsWithUsers = postsToUsers(postsData, usersData.users)
        setPosts(postsWithUsers)
        setTotal(postsData.total)
        updateURL()
      }
      setLoading(false)
    }
  }

  function fetchSearchQueryData() {
    if (!isSearchQeuryPostLoading && !isSearchQeuryPostError && searchQeuryPost) {
      const { postsSearchQueryData, usersSearchQueryData } = searchQeuryPost
      const postsWithUsers = postsToUsers(postsSearchQueryData, usersSearchQueryData.users)
      setPosts(postsWithUsers)
      setTotal(postsSearchQueryData.total)
      updateURL()
    }
  }

  useEffect(() => {
    if (searchQuery) {
      fetchSearchQueryData()
    } else {
      fetchPostsData()
    }
  }, [
    isPostByTagLoading,
    isPostByTagError,
    postsByTag,
    isPostSearchLoading,
    isPostSearchError,
    postSearch,
    search,
    sortBy,
    sortOrder,
    selectedPost,
    selectedTag,
  ])

  function handleSearch() {
    setSearch(!search)
  }
  function handleChangeSearchQuery(value: string) {
    setSearchQuery(value)
  }

  return (
    <Input
      placeholder="게시물 검색"
      className="pl-8"
      value={searchQuery}
      onChange={(e) => handleChangeSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
  )
}

export default PostSearchInput
