import { useState } from "react"
import { Post } from "../../../entities/post/model/types"

const useSelectedPostModal = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostModal, setShowPostModal] = useState(false)

  const handleSetSelectedPost = (post: Post) => {
    setSelectedPost(post)
    setShowPostModal(true)
  }

  const handleClosePostModal = () => {
    setShowPostModal(false)
  }

  return { selectedPost, handleSetSelectedPost, showPostModal, handleClosePostModal }
}

export default useSelectedPostModal
