import { useEffect, useState } from "react"
import { postsAPI } from "../../../entities/post"
import { usersAPI } from "../../../entities/user"
import { PostsListState } from "./types"

export const usePostsList = (initialState?: Partial<PostsListState>) => {
  const [state, setState] = useState<PostsListState>({
    posts: [],
    total: 0,
    isLoading: false,
    searchQuery: "",
    skip: 0,
    limit: 10,
    selectedTag: "",
    sortBy: "",
    sortOrder: "asc",
    ...initialState,
  })

  const fetchPosts = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const [postsData, usersData] = await Promise.all([
        postsAPI.getPosts(state.limit, state.skip),
        usersAPI.getUsers(),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setState((prev) => ({
        ...prev,
        posts: postsWithUsers,
        total: postsData.total,
        isLoading: false,
      }))
    } catch (error) {
      console.error("Failed to fetch posts:", error)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const searchPosts = async () => {
    if (!state.searchQuery) {
      fetchPosts()
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const { posts, total } = await postsAPI.searchPosts(state.searchQuery)
      setState((prev) => ({ ...prev, posts, total, isLoading: false }))
    } catch (error) {
      console.error("Failed to search posts:", error)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const fetchPostsByTag = async () => {
    if (!state.selectedTag || state.selectedTag === "all") {
      fetchPosts()
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const [postsData, usersData] = await Promise.all([postsAPI.getPostsByTag(state.selectedTag), usersAPI.getUsers()])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setState((prev) => ({
        ...prev,
        posts: postsWithUsers,
        total: postsData.total,
        isLoading: false,
      }))
    } catch (error) {
      console.error("Failed to fetch posts by tag:", error)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  useEffect(() => {
    if (state.selectedTag) {
      fetchPostsByTag()
    } else {
      fetchPosts()
    }
  }, [state.skip, state.limit, state.sortBy, state.sortOrder, state.selectedTag])

  return {
    ...state,
    setSearchQuery: (searchQuery: string) => setState((prev) => ({ ...prev, searchQuery })),
    setSkip: (skip: number) => setState((prev) => ({ ...prev, skip })),
    setLimit: (limit: number) => setState((prev) => ({ ...prev, limit })),
    setSelectedTag: (selectedTag: string) => setState((prev) => ({ ...prev, selectedTag })),
    setSortBy: (sortBy: string) => setState((prev) => ({ ...prev, sortBy })),
    setSortOrder: (sortOrder: "asc" | "desc") => setState((prev) => ({ ...prev, sortOrder })),
    searchPosts,
  }
}
