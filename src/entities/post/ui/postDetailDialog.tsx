import Comments from "../../../features/comments/ui/Comments"
import { Dialog, DialogContent, DialogHeader, DialogTitle, makeHighlightText } from "../../../shared/ui"
import { usePost } from "../model/post"
import { useSearchQuery } from "../model/searchQuery"

const PostDetailDialog: React.FC = () => {
  // const { selectedUser, showUserModal, setShowUserModal } = useUser()
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePost()
  const { searchQuery } = useSearchQuery()
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{makeHighlightText(selectedPost?.title as string, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{makeHighlightText(selectedPost?.body as string, searchQuery)}</p>
          {/* {renderComments(selectedPost?.id as number)} */}
          <Comments />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
