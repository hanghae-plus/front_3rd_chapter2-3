import { useComments } from '@features/comment/model/hooks'
import { commentStore } from '@features/comment/model/stores'
import { filterStore, postStore } from '@features/post/model/stores'
import { Button } from '@shared/ui'
import { CommentCard } from '@entities/comment/ui'
import { Edit2, ThumbsUp, Trash2 } from 'lucide-react'
import { useCallback } from 'react'

export const CommentSection = () => {
  const { selectedPost } = postStore()
  const { setShowEditCommentDialog, setSelectedComment } = commentStore()
  const { searchQuery } = filterStore()
  const { comments, isCommentsLoading, deleteComment, likeComment } = useComments(selectedPost?.id ?? 0)

  const handleDeleteComment = useCallback(
    (id: number) => {
      deleteComment(id)
    },
    [deleteComment],
  )

  const handleLikeComment = useCallback(
    (id: number, likes: number) => {
      likeComment({ id, likes })
    },
    [likeComment],
  )

  return (
    <div className="space-y-1">
      {!isCommentsLoading &&
        comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <CommentCard username={comment.user.username} text={comment.body} searchQuery={searchQuery} />

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
  )
}
