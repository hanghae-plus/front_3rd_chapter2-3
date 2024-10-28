import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { Comments } from "../../comment/ui/Comments"
import { usePostsContext } from "../../../shared/model/PostContext"

interface Props {
  searchQuery: string
}

export const PostDetailModal = ({ searchQuery }: Props) => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePostsContext()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {selectedPost && <Comments postId={selectedPost.id} searchQuery={searchQuery} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
