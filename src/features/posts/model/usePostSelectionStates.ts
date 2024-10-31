import { useState } from "react"
import { Post } from "../../../entities/posts/model/types"
import { Comment } from "../../../entities/comments/model/types"

export const usePostSelectionStates = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number>()
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  return {
    selectedPost,
    setSelectedPost,
    selectedUserId,
    setSelectedUserId,
    selectedComment,
    setSelectedComment,
  }
}
