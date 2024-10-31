import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import HighlightText from "./HighlightText"
import { Button } from "../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { usePost } from "../../features/post/model/usePost"
import { useComment } from "../../features/comment/model/useComment"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { deleteCommentFetch, patchCommentFetch } from "../../entities/comment/api"
import useQueryComments from "../../features/comment/api/useQueryComments"
import { useEffect } from "react"

interface Props {
  searchQuery: string
}

const PostDetailDialog = ({ searchQuery }: Props) => {
  const { selectedPost } = usePost()
  const {
    comments,
    setComments,
    setSelectedComment,
    setNewComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
  } = useComment()
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()
  const { data } = useQueryComments(selectedPost?.id as number)

  useEffect(() => {
    if (!data || comments?.[selectedPost?.id as number]) return
    setComments((prev) => ({ ...prev, [selectedPost?.id as number]: data.comments }))
  }, [data])

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await deleteCommentFetch(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }
  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const likes = comments[postId].find((c) => c.id === id)?.likes || 0 + 1
      const data = await patchCommentFetch(id, likes)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }
  // 댓글 렌더링
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
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
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
          <DialogTitle>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          {renderComments(selectedPost?.id as number)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
