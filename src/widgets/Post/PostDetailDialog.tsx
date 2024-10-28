import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { highlightText } from "../../shared/lib"
import { Plus, ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { PostType } from "../../entities/Post/model/types"

interface PostDetailDialogProps {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
  selectedPost: PostType
  searchQuery: string
  comments: { [key: number]: { id: number; body: string; likes: number; user: { username: string }[] }[] }
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
  setNewComment: (newComment: { postId: number; body: string }) => void
  setShowAddCommentDialog: (show: boolean) => void
  setSelectedComment: (selectedComment: {
    id: number
    body: string
    likes: number
    user: { username: string }[]
  }) => void
  setShowEditCommentDialog: (show: boolean) => void
}

const PostDetailDialog: React.FC<PostDetailDialogProps> = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  comments,
  likeComment,
  deleteComment,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
}) => {
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
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
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
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
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
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {renderComments(selectedPost?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
