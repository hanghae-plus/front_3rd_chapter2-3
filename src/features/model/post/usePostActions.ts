import { useAtom } from "jotai"
import { postsAtom, totalAtom, isLoadingAtom } from "../../../entities/model/post/atoms"
import { addPost, updatePost, deletePost, fetchPostsByTag, fetchPosts, searchPosts } from "../../../shared/api/post"
import type { NewPost, Post } from "../../../shared/types"

export const usePostActions = () => {
  const [, setPosts] = useAtom(postsAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)

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
    if (!tag || tag === "all") return

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
      handleFetchPosts({ limit: 10, skip: 0 })
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
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    handleFetchPostsByTag,
    handleFetchPosts,
    handleSearchPosts,
    isLoading,
  }
}
