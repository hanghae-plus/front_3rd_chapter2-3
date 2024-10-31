import { useAtom } from "jotai"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog"
import { searchQueryAtom, selectedPostAtom, showPostDetailDialogAtom } from "../../app/atom"
import { HighlightText } from "../highlightText"

interface PostDetailDialogProps {
  renderComments: (postId: number) => JSX.Element // Adjust return type based on what renderComments returns
}

const PostDetailDialog = ({ renderComments }: PostDetailDialogProps) => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [selectedPost] = useAtom(selectedPostAtom)
  const [searchQuery] = useAtom(searchQueryAtom)

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{HighlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{HighlightText(selectedPost?.body, searchQuery)}</p>
          {selectedPost && renderComments(selectedPost.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
