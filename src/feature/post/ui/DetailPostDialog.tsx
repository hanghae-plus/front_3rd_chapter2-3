import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui";
import { CommentSection } from "../../comment/ui";
import { usePostContext } from "../model/PostContext.tsx";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailPostDialog = ({ isOpen, onClose }: DialogProps) => {
  const { searchQuery, selectedPost } = usePostContext();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
