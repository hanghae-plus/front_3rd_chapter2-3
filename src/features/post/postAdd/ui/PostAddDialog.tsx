import { useCallback, useState } from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from '../../../../shared/ui';
import { addPost } from '../../../../entities/post/api/postApi';
import { Post } from '../../../../entities/post/model/types';
import { transformNewPost } from '../../../../entities/post/lib';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostAdd?: (newPost: Post) => void;
};

const createForm = () => ({ title: '', body: '', userId: 1 });

export const PostAddDialog = ({ open, onOpenChange, onPostAdd }: Props) => {
  const [postForm, setPostForm] = useState(createForm());

  const handleClickAddButton = useCallback(async () => {
    const newPost = await addPost(postForm);
    // TODO: react-query mutation으로 이동
    const post = transformNewPost(newPost);

    onPostAdd?.(post);

    setPostForm(createForm());

    // setPosts([post, ...posts])
    // TODO: zustand 스토어 > 모달_닫기()
  }, [postForm, onPostAdd]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={postForm.title}
            onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={postForm.body}
            onChange={(e) => setPostForm({ ...postForm, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={postForm.userId}
            onChange={(e) => setPostForm({ ...postForm, userId: Number(e.target.value) })}
          />
          <Button onClick={handleClickAddButton}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
