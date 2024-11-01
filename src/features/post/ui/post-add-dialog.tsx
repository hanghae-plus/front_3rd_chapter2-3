import { useState } from "react";
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

export const PostAddDialog = () => {
  const { showAddDialog, setShowAddDialog } = usePost();

  const [newPost, setNewPost] = useState<Partial<PostType>>({
    title: "",
    body: "",
    tags: [],
    views: 0,
    reactions: {
      likes: 0,
      dislikes: 0,
    },
  });

  const { postNewPostMutation } = usePostMutations();

  const handleAddPost = () => {
    postNewPostMutation.mutate(newPost);
    setShowAddDialog(false);
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
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={e => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={e => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
