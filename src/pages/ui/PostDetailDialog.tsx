import HighlightText from "../../shared/ui/HighlightText"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { usePost } from "../../features/post/model/usePost"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import CommentsComponent from "../../features/comment/ui/CommentsComponent"

interface Props {
  searchQuery: string
}

const PostDetailDialog = ({ searchQuery }: Props) => {
  const { selectedPost } = usePost()
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()

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
          {selectedPost?.id && <CommentsComponent postId={selectedPost.id} searchQuery={searchQuery} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
