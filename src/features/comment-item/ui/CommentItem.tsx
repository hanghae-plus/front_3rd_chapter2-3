import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { Comment, CommentDTO } from "../../../entities/comment/model/types"
import { useCommentsStore } from "../../comment/model/commentStore"
import { usePostParamsStore } from "../../post/model/postParamsStore"
import { useQueryClient } from "@tanstack/react-query"
import { useMutationCommentLike } from "../../comment/api/useMutationCommentLike"
import { useMutationCommentDelete } from "../../comment/api/useMutationCommentDelete"

interface Props {
  postId: number
  comment: Comment
}

export const CommentItem = ({ postId, comment }: Props) => {
  const queryClient = useQueryClient()

  const { setSelectedComment, setShowEditCommentDialog } = useCommentsStore()
  const { searchQuery } = usePostParamsStore()

  const { mutate: deleteCommentMutate } = useMutationCommentDelete()
  const { mutate: likeCommentMutate } = useMutationCommentLike()

  const handleLikeComment = (commentId: number) => {
    const data = queryClient.getQueryData<CommentDTO>(["comments", postId])
    const targetComment = data?.comments.find((comment) => comment.id === commentId)
    if (!targetComment) return

    const newLike = targetComment.likes + 1
    likeCommentMutate({ commentId, newLike })
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteCommentMutate(comment.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
