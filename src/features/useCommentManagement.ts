// useCommentManagement.ts
import { useAtom } from "jotai"
import { commentsAtom } from "../app/atom"

const useCommentManagement = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  return { fetchComments, comments, setComments }
}

export default useCommentManagement
