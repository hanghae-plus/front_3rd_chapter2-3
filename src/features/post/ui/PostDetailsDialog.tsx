import { Dialog_e, useDialogStore } from "../../../shared/model/useDialogStore"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { usePostStore } from "../model/usePostStore"
import { HighlightText } from "../../../shared/ui/HighlightText"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useCommentStore } from "../../comment/model/useCommentStore"
import { useDeleteCommentMutation } from "../../comment/api/useDeleteCommentMutation"
import { useLikeCommentMutation } from "../../comment/api/useLikeCommentMutation"
import { Comment_i } from "../../../entities/comment/model/types"
import { usePostFilter } from "../model/usePostFilter"

export const PostDetailsDialog = () => {
  const dialogStore = useDialogStore()

  const { searchQuery } = usePostFilter({})
  const selectedPost = usePostStore((state) => state.selectedPost)

  const [comments, likeComment, deleteComment, setSelectedComment] = useCommentStore((state) => [
    state.comments,
    state.likeComment,
    state.deleteComment,
    state.setSelectedComment,
  ])

  const likeCommentMutation = useLikeCommentMutation()
  const deleteCommentMutation = useDeleteCommentMutation()

  const handleLikeComment = (comment: Comment_i) => {
    console.warn("handleLikeComment", comment)
    likeCommentMutation.mutate(
      { id: comment.id, comment },
      {
        onSuccess: (data) => {
          likeComment(comment.id, postId, data)
        },
        onError: (error) => {
          console.error("게시물 추가 오류:", error)
        },
      },
    )
  }

  const handleDeleteComment = (comment: Comment_i) => {
    deleteCommentMutation.mutate(
      { id: comment.id },
      {
        onSuccess: () => {
          deleteComment(comment.id, postId)
        },
      },
    )
  }

  console.warn("comments", comments)

  const postId = selectedPost?.id || 0

  return (
    <Dialog open={true} onOpenChange={dialogStore.onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title || ""} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body || ""} highlight={searchQuery} />
          </p>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <Button
                size="sm"
                onClick={() => {
                  dialogStore.openDialog(Dialog_e.CommentAdd)
                }}
              >
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            <div className="space-y-1">
              {comments[postId]?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">
                      <HighlightText text={comment.body} highlight={searchQuery} />
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment)}>
                      <ThumbsUp className="w-3 h-3" />
                      <span className="ml-1 text-xs">{comment.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedComment(comment)
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
