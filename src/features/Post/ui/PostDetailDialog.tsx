import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { RenderComments } from "../../Comment/ui/RenderComments"
import { usePostManagerStore } from "../../../pages/model/stores/usePostManagerStore"
import { usePostStore } from "../model/stores/usePostStore"

export const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostManagerStore()
  const { selectedPost, searchQuery } = usePostStore()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.body || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          {RenderComments(selectedPost?.id || 0)}
        </div>
      </DialogContent>
    </Dialog>
  )
}
