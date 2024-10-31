import { useEffect, useState } from "react"
import { commentsAPI } from "../../../entities/comment"
import { CommentsListState } from "./types"

export const useCommentsList = (postId: number) => {
  const [state, setState] = useState<CommentsListState>({
    comments: [],
    isLoading: false,
  })

  const fetchComments = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const { comments } = await commentsAPI.getComments(postId)
      setState({ comments, isLoading: false })
    } catch (error) {
      console.error("Failed to fetch comments:", error)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  return {
    ...state,
    refreshComments: fetchComments,
  }
}
