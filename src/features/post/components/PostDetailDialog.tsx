import { Plus } from "lucide-react"
import { highlightText } from "../../../shared/lib/text"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"

const PostDetailDialog = () => {
  // const renderComments = () => (
  //     <div className="mt-2">
  //       <div className="flex items-center justify-between mb-2">
  //         <h3 className="text-sm font-semibold">댓글</h3>
  //         <Button
  //           size="sm"
  //           onClick={() => {
  //             setNewComment((prev) => ({ ...prev, postId }))
  //             setShowAddCommentDialog(true)
  //           }}
  //         >
  //           <Plus className="w-3 h-3 mr-1" />
  //           댓글 추가
  //         </Button>
  //       </div>
  //       <div className="space-y-1">
  //         {comments.map((comment) => (
  //           <CommentIte
  //             key={comment.id}
  //             comment={comment}
  //             searchQuery={searchQuery}
  //             onLikeClick={handleLikeComment}
  //             onDeleteClick={handleDeleteComment}
  //             onEditClick={(comment) => {
  //               setSelectedComment(comment)
  //               setShowEditCommentDialog(true)
  //             }}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   )

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {renderComments(selectedPost?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
