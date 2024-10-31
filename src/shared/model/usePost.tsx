import { useState } from "react"
import { addPost, updatePost, deletePost } from "../api/post"
import type { NewPost, Post } from "../types"

interface UsePostProps {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  handleAddPost: (newPost: NewPost) => Promise<void>
  handleUpdatePost: (post: Post) => Promise<void>
  handleDeletePost: (id: number) => Promise<void>
}

export const usePost = (): UsePostProps => {
  const [posts, setPosts] = useState<Post[]>([])

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

  return { posts, setPosts, handleAddPost, handleUpdatePost, handleDeletePost }
}
