import { useState } from "react"
import { addPost, updatePost, deletePost, fetchPostsByTag, fetchPosts, searchPosts } from "../api/post"
import type { NewPost, Post } from "../types"

interface UsePostProps {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
  handleAddPost: (newPost: NewPost) => Promise<void>
  handleUpdatePost: (post: Post) => Promise<void>
  handleDeletePost: (id: number) => Promise<void>
  handleFetchPostsByTag: (tag: string) => Promise<void>
  handleFetchPosts: (params: { limit: number; skip: number }) => Promise<void>
  handleSearchPosts: (query: string) => Promise<void>
}

export const usePost = (): UsePostProps => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddPost = async (newPost: NewPost) => {
    const data = await addPost(newPost)
    if (data) {
      setPosts((prevPosts) => [data, ...prevPosts])
      return data
    }
  }

  const handleUpdatePost = async (post: Post) => {
    const data = await updatePost(post)
    if (data) {
      setPosts((prevPosts) => prevPosts.map((p) => (p.id === data.id ? data : p)))
      return data
    }
  }

  const handleDeletePost = async (id: number) => {
    const success = await deletePost(id)
    if (success) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    }
  }

  const handleFetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      // fetchPosts() 함수 호출 (이 함수도 추가로 분리 필요)
      return
    }
    try {
      setIsLoading(true)
      const data = await fetchPostsByTag(tag)
      if (data) {
        setPosts(data.posts)
        setTotal(data.total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFetchPosts = async (params: { limit: number; skip: number }) => {
    setIsLoading(true)
    try {
      const data = await fetchPosts(params)
      if (data) {
        setPosts(data.posts)
        setTotal(data.total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchPosts = async (query: string) => {
    if (!query) {
      handleFetchPosts({ limit: 10, skip: 0 }) // 기본값 사용
      return
    }

    setIsLoading(true)
    try {
      const data = await searchPosts(query)
      if (data) {
        setPosts(data.posts)
        setTotal(data.total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    posts,
    setPosts,
    total,
    setTotal,
    isLoading,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    handleFetchPostsByTag,
    handleFetchPosts,
    handleSearchPosts,
  }
}
