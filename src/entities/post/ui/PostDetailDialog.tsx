import { useDialog } from "../../../features/post/model/dialogStore"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { HighlightedText } from "../../../shared/ui/HighlightedText"
import { Comment } from "../../comment/model/types"
import { Comments } from "../../comment/ui/Comments"
import { Post } from "../model/types"

export const PostDetailDialog: React.FC<{
  selectedPost: Post
  searchQuery: string
  setShowCommentAddDialog: (value: boolean) => void
  setSelectedComment: (comment: Comment) => void
  setShowCommentUpdateDialog: (value: boolean) => void
}> = ({ selectedPost, searchQuery, setShowCommentAddDialog, setSelectedComment, setShowCommentUpdateDialog }) => {
  const { showPostDetailDialog, setShowPostDetailDialog } = useDialog()
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
        {
          <Comments
            postId={selectedPost.id}
            searchQuery={searchQuery}
            setShowCommentAddDialog={setShowCommentAddDialog}
            setSelectedComment={setSelectedComment}
            setShowCommentUpdateDialog={setShowCommentUpdateDialog}
          />
        }
      </>
    </CustomDialog>
  )
}
