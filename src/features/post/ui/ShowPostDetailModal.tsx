import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { searchParamsAtom } from "@features/filter/model"
import { selectedPostsAtom } from "@features/post/model"
import { useModal } from "@features/modal/hooks"
import { highlightText } from "@shared/utils/highlightText"
import { CommentInfo } from "@features/comment/ui"
import { useAtomValue } from "jotai"

export const ShowPostDetailModal: React.FC = () => {
  const { openDetailPost, closeModal } = useModal()
  const { searchQuery: searchQuery } = useAtomValue(searchParamsAtom)
  const selectedPost = useAtomValue(selectedPostsAtom)

  return (
    <Dialog
      open={openDetailPost}
      onOpenChange={() => closeModal("detailPost")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost?.title, searchQuery)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full max-w-md">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentInfo postId={selectedPost?.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
