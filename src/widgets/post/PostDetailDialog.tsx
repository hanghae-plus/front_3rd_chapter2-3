import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import HighlightText from "../ui/HighlightText"
import { CommentContent } from "../comments/CommentContent"
import { useSearch } from "../../features/post/model/useSearch"
import { usePost } from "../../features/post/model/usePost"

export const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePost()
  const { searchQuery } = useSearch()

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
