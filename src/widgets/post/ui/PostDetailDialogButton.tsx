import { MessageSquare } from "lucide-react"
import { useState } from "react"
import { Post } from "../../../entities/post/model/types"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  TextHighlighter,
} from "../../../shared/ui"
import { Comments } from "../../comment"

type Props = {
  selectedPost: Post | null
  search: string
}

export const PostDetailDialogButton = ({ selectedPost, search }: Props) => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const handleOpenDialog = () => setShowPostDetailDialog(true)

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleOpenDialog}>
        <MessageSquare className="w-4 h-4" />
      </Button>

      <Dialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              <TextHighlighter text={selectedPost?.title} highlight={search} />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <TextHighlighter text={selectedPost?.body} highlight={search} />
            </p>
            {selectedPost && <Comments postId={selectedPost?.id} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
