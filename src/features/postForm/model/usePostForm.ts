import { useState } from "react"
import { Post, postsAPI } from "../../../entities/post"
import { PostFormData } from "./types"

export const usePostForm = (post?: Post) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || "",
    body: post?.body || "",
    userId: post?.userId || 1,
  })

  const handleSubmit = async () => {
    if (post) {
      return postsAPI.updatePost({ ...post, ...formData })
    }
    return postsAPI.addPost(formData)
  }

  return {
    formData,
    setFormData,
    handleSubmit,
  }
}
