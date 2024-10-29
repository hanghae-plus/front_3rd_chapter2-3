import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostsContext } from "../../../app/PostsContext"

const usePosts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const {
    posts,
    total,
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    loading,
    newPost,
    showAddDialog,
    setPosts,
    setTotal,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setLoading,
    setNewPost,
    setShowAddDialog,
  } = usePostsContext();
  

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    navigate(`?${params.toString()}`)
  }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }


  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [skip, limit, sortBy, sortOrder])

  return {
    location,
    fetchPosts,
    updateURL,
    searchPosts,
    addPost,
    deletePost,
  }
}

export default usePosts;