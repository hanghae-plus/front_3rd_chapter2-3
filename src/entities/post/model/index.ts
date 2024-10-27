import { useState } from "react"
import { deletePostApi } from "../api"
import { Post } from "./types"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const deletePost = (postId: number) => {
    deletePostApi(postId)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return { posts, setPosts, deletePost }
}
