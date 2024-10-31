import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui";
import { usePost, usePostNewPost } from "../model";

export const PostAddDialog = () => {
  const { setNewPost, newPost, showAddDialog, setShowAddDialog, setPosts, posts } = usePost();

  const { mutate: postNewPost } = usePostNewPost({
    onSuccess: (data) => {
      if (data) {
        setPosts([data, ...posts]);
        setShowAddDialog(false);
        setNewPost({ title: "", body: "", userId: 1 });
      }
    },
  });

  const handleAddPost = () => {
    postNewPost(newPost);
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
