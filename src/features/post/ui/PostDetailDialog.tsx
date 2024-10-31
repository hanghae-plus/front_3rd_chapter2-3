import React from "react"
import { Plus, ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useComments } from "../../../entities/Comment/model/useComment"
import { useCommentDialog } from "../../../entities/Comment/model/useCommentDialog"
import usePost from "../../../entities/Post/model/usePost"
import { usePostDialog } from "../../../entities/Post/model/usePostDialog"
import { highlightText } from "../../../shared/lib"
import { useQueryParams } from "../../../shared/model/useQueryParams"
import { Button, DialogHeader } from "../../../shared/ui"

const PostDetailDialog: React.FC = () => {
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()
  const { selectedPost } = usePost()
  const { searchQuery } = useQueryParams()
  const { setShowAddCommentDialog, setShowEditCommentDialog } = useCommentDialog()

  const { comments, isCommentsLoading, deleteComment, likeComment, setNewComment, setSelectedComment } = useComments(
    selectedPost?.id ?? 0,
  )

  const handleDeleteComment = (id: number) => {
    deleteComment(id)
  }
  const handleLikeComment = (id: number, likes: number) => {
    likeComment({ id, likes })
  }

  const renderComments = (postId: number) => (
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
        {!isCommentsLoading &&
          comments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment?.user?.username}:</span>
                <span className="truncate">{highlightText(comment?.body, searchQuery)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, comment.likes + 1)}>
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
                <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title ?? "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body ?? "", searchQuery)}</p>
          {renderComments(selectedPost?.id ?? 0)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
