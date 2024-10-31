import CommentsSection from "../../../features/comments/components/CommentsSection"
import usePost from "../../../features/posts/hooks/usePost"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/"
import HighlightText from "../../../shared/ui/HighlightText"

const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost, searchQuery } = usePost()
  if (!selectedPost) {
    return
  }
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
            {" "}
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          {selectedPost.id && <CommentsSection postId={selectedPost?.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
