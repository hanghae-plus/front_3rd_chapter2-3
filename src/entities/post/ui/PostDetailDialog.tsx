import { useDialog } from "../../../features/post/model/dialogStore"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { HighlightedText } from "../../../shared/ui/HighlightedText"
import { Comment } from "../../comment/model/types"
import { Comments } from "../../comment/ui/Comments"
import { Post } from "../model/types"

export const PostDetailDialog: React.FC<{
  selectedPost: Post
  searchQuery: string
  comments: Record<number, Comment[]>
  setShowCommentAddDialog: (value: boolean) => void
  setSelectedComment: (comment: Comment) => void
  setShowCommentUpdateDialog: (value: boolean) => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
}> = ({
  selectedPost,
  searchQuery,
  comments,
  setShowCommentAddDialog,
  setSelectedComment,
  setShowCommentUpdateDialog,
  likeComment,
  deleteComment,
}) => {

  const {
    showPostDetailDialog,
    setShowPostDetailDialog,
  } = useDialog()

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
        <Comments
          comments={comments}
          postId={selectedPost.id}
          searchQuery={searchQuery}
          setShowCommentAddDialog={setShowCommentAddDialog}
          setSelectedComment={setSelectedComment}
          setShowCommentUpdateDialog={setShowCommentUpdateDialog}
          likeComment={likeComment}
          deleteComment={deleteComment}
        />
      </>
    </CustomDialog>
  )
}