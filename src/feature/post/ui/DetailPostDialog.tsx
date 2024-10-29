import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui";
import { CommentSection } from "../../comment/ui";
import { usePostContext } from "../model/PostContext.tsx";

export const DetailPostDialog = ({ isOpen, onClose }) => {
  const {
    searchQuery,
    selectedPost,
    setNewComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    likeComment,
    deleteComment,
  } = usePostContext();

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
              setNewComment={setNewComment}
              setSelectedComment={setSelectedComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
              setShowEditCommentDialog={setShowEditCommentDialog}
              searchQuery={searchQuery}
              likeComment={likeComment}
              deleteComment={deleteComment}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
