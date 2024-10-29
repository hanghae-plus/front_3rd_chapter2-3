import { Comments } from "../../features/comment/model/types"

interface Props {
  postId: number
  comments: Comments
  setComments: React.Dispatch<React.SetStateAction<Comments>>
}

// 댓글 가져오기
export const fetchComments = async ({ postId, comments, setComments }: Props) => {
  if (comments?.[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}
