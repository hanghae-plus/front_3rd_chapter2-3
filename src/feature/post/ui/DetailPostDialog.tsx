import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui";
import { CommentSection } from "../../comment/ui";
import { usePostContext } from "../model/PostContext.tsx";

export const DetailPostDialog = () => {
  const { searchQuery, selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostContext();

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
