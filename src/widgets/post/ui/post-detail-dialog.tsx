import { usePost } from "../../../features/post";
import { usePostQuery } from "../../../features/post/api/use-post-query";
import { renderHighlightText } from "../../../shared/lib";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui";
import { CommentList } from "../../comment";

export const PostDetailDialog = () => {
  const { searchQuery } = usePostQuery();
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePost();

  if (!selectedPost) return null;

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{renderHighlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{renderHighlightText(selectedPost?.body, searchQuery)}</p>
          <CommentList />
        </div>
      </DialogContent>
    </Dialog>
  );
};
