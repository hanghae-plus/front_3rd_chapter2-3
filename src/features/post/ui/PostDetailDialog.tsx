import { DialogLayout, HighlightText } from '@widgets/ui'
import { filterStore, postStore } from '../model/stores'
import { Button } from '@shared/ui'
import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react'
import { commentStore } from '@features/comment/model/stores'
import { useComments } from '@features/comment/model/hooks'

export const PostDetailDialog = () => {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = postStore()

  const { newComment, setNewComment, setShowAddCommentDialog, setShowEditCommentDialog, setSelectedComment } =
    commentStore()

  const { searchQuery } = filterStore()

  const { comments, isCommentsLoading, deleteComment, likeComment } = useComments(selectedPost?.id ?? 0)

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id)
  }

  const handleLikeComment = async (id: number, likes: number) => {
    await likeComment({ id, likes })
  }

  return (
    <DialogLayout
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={<HighlightText text={selectedPost?.title || ''} highlight={searchQuery} />}
    >
      <p>
        <HighlightText text={selectedPost?.body || ''} highlight={searchQuery} />
      </p>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment({ ...newComment, postId: selectedPost?.id ?? 0 })
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
                <span className="font-medium truncate">{comment.user.username}:</span>
                <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
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
    </DialogLayout>
  )
}
