import { useCallback, useEffect, useMemo, useState } from "react"
import { NewComment } from "@entities/comment/model"

export const useCommentForm = (initialData: NewComment ) => {
  const [commentForm, setCommentForm] = useState<NewComment>({
    ...initialData,
  })

  useEffect(() => {
    setCommentForm({ ...initialData })
  }, [])

  const updateCommentForm = useCallback(
    (update: Partial<NewComment>) => {
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

export default useCommentForm