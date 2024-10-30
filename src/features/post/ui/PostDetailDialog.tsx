import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText.tsx"
import { usePostDialog } from "../model/usePostDialog.ts"
import { usePostParams } from "../model/usePostParams.ts"

export default function PostDetailDialog() {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()
  const { searchQuery } = usePostParams()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {/*{renderComments(selectedPost?.id)}*/}
        </div>
      </DialogContent>
    </Dialog>
  )
}
