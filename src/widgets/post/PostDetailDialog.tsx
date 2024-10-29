import React from "react"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { Comments, NewComment, Comment } from "../../entities/comment/model/type"
import { Post, PostId } from "../../entities/post/model/type"
import HighlightText from "../ui/HighlightText"
import { deleteCommentApi, likeCommentApi } from "../../entities/comment/api"

interface Props {
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  comments: Comments
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  showPostDetailDialog: boolean
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedPost: Post | null
  searchQuery: string
  setComments: React.Dispatch<React.SetStateAction<Comments>>
}

const PostDetailDialog = ({
  setNewComment,
  setShowAddCommentDialog,
  comments,
  setSelectedComment,
  setShowEditCommentDialog,
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  setComments,
}: Props) => {
  // 댓글 삭제

  const CommentLikeButton = ({ comment, postId }: { comment: Comment; postId: PostId }) => {
    // 댓글 좋아요
    const likeComment = async (id: number, postId: number) => {
      const newLikes = comments[postId].find((c) => c.id === id)?.likes || 0 + 1
      const data = await likeCommentApi(id, newLikes)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    }
    return (
      <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>
    )
  }

  const CommentItem = ({ comment, postId }: { comment: Comment; postId: PostId }) => {
    const deleteComment = async (id: number, postId: number) => {
      await deleteCommentApi(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    }
    return (
      <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
        <div className="flex items-center space-x-2 overflow-hidden">
          <span className="font-medium truncate">{comment.user.username}:</span>
          <span className="truncate">
            <HighlightText text={comment.body} highlight={searchQuery} />
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <CommentLikeButton comment={comment} postId={postId} />
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
    )
  }
  // 댓글 렌더링
  const CommentContent = ({ postId }: { postId: PostId }) => (
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
        {comments[postId]?.map((comment) => <CommentItem comment={comment} postId={postId} />)}
      </div>
    </div>
  )
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          <CommentContent postId={selectedPost?.id as number} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
