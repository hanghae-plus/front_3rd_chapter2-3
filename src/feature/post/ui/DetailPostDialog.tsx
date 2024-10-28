import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui";
import { CommentSection } from "../../comment/ui";

export const DetailPostDialog = ({
  isOpen,
  onClose,
  searchQuery,
  selectedPost,
  comments,
  setNewComment,
  setSelectedComment,
  setShowAddCommentDialog,
  setShowEditCommentDialog,
  likeComment,
  deleteComment,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {selectedPost && (
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{HighlightText(selectedPost.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{HighlightText(selectedPost.body, searchQuery)}</p>
            <CommentSection
              postId={selectedPost.id}
              comments={comments}
              setNewComment={setNewComment}
              setSelectedComment={setSelectedComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
              setShowEditCommentDialog={setShowEditCommentDialog}
              searchQuery={searchQuery}
              likeComment={likeComment}
              deleteComment={deleteComment}
            ></CommentSection>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
