import { CustomDialog } from "../../../widgets/ui/CustomDialog"
import { HighlightedText } from "../../../widgets/ui/HighlightedText"
import { Post } from "../model/types"

export const PostDetailDialog: React.FC<{
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (value: boolean) => void
  selectedPost: Post
  searchQuery: string
  renderComments: (postId: number) => React.ReactNode
}> = ({ showPostDetailDialog, setShowPostDetailDialog, selectedPost, searchQuery, renderComments }) => {
  return (
    <CustomDialog
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      className={"max-w-3xl"}
      title={selectedPost.title}
      highlightedText={searchQuery}
    >
      <>
        <p>
          <HighlightedText text={selectedPost.body} highlight={searchQuery} />
        </p>
        {renderComments(selectedPost.id)}
      </>
    </CustomDialog>
  )
}
