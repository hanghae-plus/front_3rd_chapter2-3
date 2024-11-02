import { commentStore } from '@features/comment/model/stores'
import { filterStore, postStore } from '@features/post/model/stores'
import { Button, HighlightText } from '@shared/ui'
import { Plus } from 'lucide-react'

export default function PostContent() {
  const { selectedPost } = postStore()

  const { newComment, setNewComment, setShowAddCommentDialog } = commentStore()

  const { searchQuery } = filterStore()

  return (
    <>
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
    </>
  )
}
