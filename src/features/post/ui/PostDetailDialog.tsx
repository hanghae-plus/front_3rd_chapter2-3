import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useSearch } from "../../../shared/model/useSearch"
import { DialogHeader } from "../../../shared/ui"
import { CommentContent } from "../../../widgets/comment/CommentContent"
import HighlightText from "../../../widgets/HighlightText"
import { usePost } from "../model/store"

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
