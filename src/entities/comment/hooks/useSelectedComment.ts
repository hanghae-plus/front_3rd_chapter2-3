import { selectedCommentAtom } from "@entities/comment/model/atom"
import { Comment } from "@entities/comment/types"
import { useCallback, useMemo } from "react"
import { useAtom } from "jotai"

export const useSelectedComment = () => {
  const [selectedComment, setSelectedComment] =
    useAtom<Comment>(selectedCommentAtom)

  const updateSelectedComment = useCallback(
    (post: Comment) => {
      setSelectedComment(post)
    },
    [selectedComment],
  )

  return {
    selectedComment: useMemo(() => selectedComment, [selectedComment]),
    updateSelectedComment,
  }
}
