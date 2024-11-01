import { PostType } from "../../../entities/post";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../../shared/ui";
import { usePostMutations } from "../api/use-post-mutations";
import { usePost } from "../model/use-post";

export const PostEditDialog = () => {
  const { showEditDialog, setShowEditDialog } = usePost();

  const { selectedPost, setSelectedPost } = usePost();

  const { updatePostMutation } = usePostMutations();

  const handleUpdatePost = (selectedPost: PostType | null) => {
    if (selectedPost) {
      updatePostMutation.mutate(selectedPost);
      setShowEditDialog(false);
    }
  };

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={e => {
              if (selectedPost) {
                setSelectedPost({ ...selectedPost, title: e.target.value });
              }
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={e => {
              if (selectedPost) {
                setSelectedPost({ ...selectedPost, body: e.target.value });
              }
            }}
          />
          <Button onClick={() => handleUpdatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
