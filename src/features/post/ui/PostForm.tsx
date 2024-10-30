import { Input } from '../../../shared/ui/InputBox/InputBox';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { Button } from '../../../shared/ui/Button/Button';
import usePostMutations from '../model/usePostMutations';
import { useAtom } from 'jotai';
import { newPostAtom, showAddDialogAtom, showEditDialogAtom } from '../../../entities/post/model/postAtom.js';

const PostForm = () => {
  const [newPost, setNewPost] = useAtom(newPostAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const { addPostMutation, updatePostMutation } = usePostMutations();

  const isEdit = showEditDialog && newPost.id;

  const handleSubmit = () => {
    if (isEdit) {
      updatePostMutation.mutate(newPost);
    } else {
      addPostMutation.mutate(newPost);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <Textarea
        rows={5}
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
      <Button onClick={handleSubmit}>{isEdit ? '게시물 업데이트' : '게시물 추가'}</Button>
    </div>
  );
};

export default PostForm;