import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import type { Post } from "@/shared/types"
import { DialogProps } from "@/shared/ui/Dialog"
import { highlightText } from "@/shared/lib"

interface Props {
  open: boolean
  onOpenChange: DialogProps["onOpenChange"]
  selectedPost: Post | null
  searchQuery: string
  generateCommentSection: (postId: number) => React.ReactNode
}

const PostDetailDialog = ({ open, onOpenChange, selectedPost, generateCommentSection, searchQuery }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {selectedPost && generateCommentSection(selectedPost?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
