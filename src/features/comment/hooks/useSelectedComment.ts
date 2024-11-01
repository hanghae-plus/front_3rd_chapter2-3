import { Comment } from "@entities/comment/model"
import { useCallback, useMemo } from "react"
import { atom, useAtom } from "jotai"
import { commentInitialValue } from "../config/commentInitialValue"

const selectedCommentAtom = atom(commentInitialValue.comment)

export const useSelectedComment = () => {
  const [selectedComment, setSelectedComment] = useAtom<Comment>(selectedCommentAtom)

  const updateSelectedComment = useCallback(
    (comment: Comment) => {
      setSelectedComment(comment)
    },
    [setSelectedComment]
  )

  return {
    selectedComment: useMemo(() => selectedComment, [selectedComment]),
    updateSelectedComment,
  }
}

export default useSelectedComment