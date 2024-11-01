import { Post, PostForm } from "@entities/post/types"
import { useEffect, useMemo, useState } from "react"

export const usePostForm = (isOpen: boolean, initialValue: Partial<Post>) => {
  const [postForm, setPostForm] = useState<Partial<Post>>({ ...initialValue })

  useEffect(() => {
    if (isOpen) updatePostForm({ ...initialValue })
    else resetPostForm()
  }, [isOpen])

  const updatePostForm = (update: Partial<PostForm>) => {
    setPostForm((prev) => ({ ...prev, ...update }))
  }

  const resetPostForm = () => setPostForm(initialValue)

  return {
    postForm: useMemo(() => postForm, [postForm]),
    updatePostForm,
    resetPostForm,
  }
}
