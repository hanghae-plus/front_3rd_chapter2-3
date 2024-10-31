import { DialogProps } from "@radix-ui/react-dialog"
import { Post } from "../../../../entities/post/model/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  TextHighlighter,
} from "../../../../shared/ui"
import { Comments } from "../../../comment"

type Props = Pick<DialogProps, "open" | "onOpenChange"> & {
  selectedPost: Post | null
  searchQuery: string
}

export const PostDetailDialog = ({
  open,
  onOpenChange,

  selectedPost,
  searchQuery,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <TextHighlighter
              text={selectedPost?.title}
              highlight={searchQuery}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <TextHighlighter
              text={selectedPost?.body}
              highlight={searchQuery}
            />
          </p>
          {selectedPost && <Comments postId={selectedPost?.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
