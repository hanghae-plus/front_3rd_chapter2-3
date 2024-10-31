import { useAtom } from "jotai"
import { Post } from "../../../app/type"
import { selectedPostAtom, showPostDetailDialogAtom } from "../../../app/atom"
import { useGetComment } from "../comment/useGetComment"
import { useState } from "react"

const usePostDetail = () => {
  const [, setSelectedPost] = useAtom(selectedPostAtom)
  const [, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [selectedPostId] = useState<number | null>(null)

  const { data: getComments } = useGetComment(selectedPostId ?? 0) // Use a fallback postId if null

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    getComments(post.id)
    setShowPostDetailDialog(true)
  }

  return { openPostDetail }
}

export default usePostDetail
