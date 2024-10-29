/* 게시물 상세 보기 대화상자 */

import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../../../shared/ui/dialog/Dialog"
import { highlightText } from "../../../shared/ui"

export const PostDetailDialog = () => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {renderComments(selectedPost?.id)}

          {/* {CommentSection(selectedPost?.id, comments, setComments, searchQuery)} */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
