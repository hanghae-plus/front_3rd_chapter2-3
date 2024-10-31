import {
  NewComment,
  Comment,
  CommentsByPost,
} from "../../../entities/comment/model/type"
import { Post } from "../../../entities/post/model/type"
import { PostsCommentList } from "../../../features/comment/ui/PostsCommentList"
import { highlightText } from "../../../shared/lib/highlightText"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui/Dialog"

interface Props {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
  selectedPost: Post | null
  searchQuery: string

  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  comments: CommentsByPost
  likeComment: (id: number, postId: number) => Promise<void>
  setSelectedComment: (comment: Comment | null) => void
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  deleteComment: (id: number, postId: number) => Promise<void>
}

export const DetailPostDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,

  setNewComment,
  setShowAddCommentDialog,
  comments,
  likeComment,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
}: Props) => {
  if (selectedPost === null) return

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost?.title, searchQuery)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {/* {renderComments(selectedPost?.id)} */}

          <PostsCommentList
            postId={selectedPost?.id}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            comments={comments}
            searchQuery={searchQuery}
            likeComment={likeComment}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            deleteComment={deleteComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
