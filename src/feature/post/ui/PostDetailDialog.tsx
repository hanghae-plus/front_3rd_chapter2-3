import { useAtom } from "jotai"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/Dialog"
import { highlightText } from "../../../shared/utils/highlightText"
import { CommentRender } from "../../comment/ui/CommentRender"
import { searchQueryAtom, selectedPostAtom, showPostDetailDialogAtom } from "../model/postAtoms"

export const PostDetailDialog = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [selectedPost] = useAtom(selectedPostAtom)
  const [searchQuery] = useAtom(searchQueryAtom)

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {<CommentRender postId={selectedPost?.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
