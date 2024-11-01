import { useCallback, useEffect, useMemo, useState } from "react"
import { CommentForm } from "../types"

export const useCommentForm = (initialData: CommentForm) => {
  const [commentForm, setCommentForm] = useState<CommentForm>({
    ...initialData,
  })

  useEffect(() => {
    setCommentForm({ ...initialData })
  }, [])

  const updateCommentForm = useCallback(
    (update: Partial<CommentForm>) => {
      setCommentForm((prev) => ({ ...prev, ...update }))
    },
    [commentForm],
  )

  const resetCommentForm = () => {
    setCommentForm((prev) => ({ ...prev, title: "", body: "" }))
  }

  return {
    commentForm: useMemo(() => commentForm, [commentForm]),
    updateCommentForm,
    resetCommentForm,
  }
}
