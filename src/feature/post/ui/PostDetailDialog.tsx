import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui";
import { CommentSection } from "../../comment/ui";
import { usePost } from "../model";

export const PostDetailDialog = () => {
  const { searchQuery, selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePost();

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      {selectedPost && (
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{HighlightText(selectedPost.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{HighlightText(selectedPost.body, searchQuery)}</p>
            <CommentSection postId={selectedPost.id} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
