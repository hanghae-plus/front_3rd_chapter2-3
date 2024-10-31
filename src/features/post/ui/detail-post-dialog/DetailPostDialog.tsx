import { DialogLayout, HighlightText } from '@shared/ui'
import { filterStore, postStore } from '@features/post/model/stores'
import PostContent from './PostContent'
import { CommentSection } from '@features/comment/ui'

export const DetailPostDialog = () => {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = postStore()

  const { searchQuery } = filterStore()

  return (
    <DialogLayout
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={<HighlightText text={selectedPost?.title || ''} highlight={searchQuery} />}
    >
      <div>
        <PostContent />
        <CommentSection />
      </div>
    </DialogLayout>
  )
}
