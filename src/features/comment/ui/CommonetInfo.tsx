import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import { useEffect } from "react"
import { PostType } from "../../../entities/post/api/types"
import useCommentStore from "../../../entities/comment/model/useCommentStore"
import useTableStore from "../../table/model/useTableStore"
import { HighlightText } from "../../../widgets/post/ui/HighlightText"
import AddCommentButtonDialog from "./AddCommentButtonDialog"
import { CommentType } from "../../../entities/comment/api/types"

interface Props {
  postId: PostType["id"]
}

const CommonetInfo: React.FC<Props> = ({ postId }) => {
  const { comments, setComments, fetchCommentByPostId, fetchLikeComment } = useCommentStore()
  const { searchQuery } = useTableStore()

  useEffect(() => {
    fetchCommentByPostId(postId)

    return () => setComments([])
  }, [postId])

  const onClickLikeBtn = (commentId: CommentType["id"], currentlikes: CommentType["likes"]) => {
    console.log(commentId, currentlikes)
    fetchLikeComment(commentId, currentlikes)
  }
  const onClickDeleteBtn = (commentId: CommentType["id"], postId: PostType["id"]) => {
    console.log(commentId, postId)
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <AddCommentButtonDialog postId={postId} />
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => onClickLikeBtn(comment.id, comment.likes)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                // onClick={() => {
                //   setSelectedComment(comment)
                //   setShowEditCommentDialog(true)
                // }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onClickDeleteBtn(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommonetInfo
