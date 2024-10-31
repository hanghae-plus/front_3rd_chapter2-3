import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui";
import { usePost, useUpdatePost } from "../model";

export const PostEditDialog = () => {
  const { selectedPost, setSelectedPost, setPosts, posts, showEditDialog, setShowEditDialog } = usePost();

  const { mutate: updatePost } = useUpdatePost({
    onSuccess: (data) => {
      if (data) {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)));
        setShowEditDialog(false);
      }
    },
  });

  const handleUpdatePost = async () => {
    if (selectedPost) {
      updatePost(selectedPost);
    }
  };

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        {selectedPost && (
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost.title || ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost.body || ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
