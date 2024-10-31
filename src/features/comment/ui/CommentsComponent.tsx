import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui/Button"
import { useComment } from "../model/useComment"
import CommentComponent from "./CommentComponent"
import { useEffect } from "react"
import useQueryComments from "../api/useQueryComments"

interface Props {
  postId: number
  searchQuery: string
}

const CommentsComponent = ({ postId, searchQuery }: Props) => {
  const { comments, setComments, setNewComment, setShowAddCommentDialog } = useComment()
  const { data, error } = useQueryComments(postId)

  useEffect(() => {
    if (error) {
      console.error("댓글 가져오기 오류:", error)
      return
    }
    if (!data || comments?.[postId]) return
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  }, [data])

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <CommentComponent comment={comment} postId={postId} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  )
}

export default CommentsComponent
