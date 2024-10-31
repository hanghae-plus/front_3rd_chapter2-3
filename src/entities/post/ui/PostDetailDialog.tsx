import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { HighlightedText } from "../../../shared/ui/HighlightedText"
import { NewComment, Comment } from "../../comment/model/types"
import { Comments } from "../../comment/ui/Comments"
import { Post } from "../model/types"

export const PostDetailDialog: React.FC<{
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (value: boolean) => void
  selectedPost: Post
  searchQuery: string
  comments: Record<number, Comment[]>
  newComment: NewComment
  setNewComment: (prev: NewComment) => void
  setShowAddCommentDialog: (value: boolean) => void
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (value: boolean) => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
}> = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  comments,
  newComment,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
  likeComment,
  deleteComment,
}) => {
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
          newComment={newComment}
          searchQuery={searchQuery}
          setNewComment={setNewComment}
          setShowAddCommentDialog={setShowAddCommentDialog}
          setSelectedComment={setSelectedComment}
          setShowEditCommentDialog={setShowEditCommentDialog}
          likeComment={likeComment}
          deleteComment={deleteComment}
        />
      </>
    </CustomDialog>
  )
}
