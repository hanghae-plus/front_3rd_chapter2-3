import { NewPost } from "@/pages/PostsManagerPage";
import { Button, Dialog, Input, Textarea } from "@/shared/ui";

type ModalAddPostProps = {
  showAddDialog: boolean;
  setShowAddDialog: (open: boolean) => void;
  newPost: NewPost;
  addPost: () => void;
  onChangePost: (key: keyof NewPost, value: string | number) => void;
};

const ModalAddPost = ({ showAddDialog, setShowAddDialog, newPost, addPost, onChangePost }: ModalAddPostProps) => {
  return (
    <Dialog.Container open={showAddDialog} onOpenChange={setShowAddDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input placeholder="제목" value={newPost.title} onChange={(e) => onChangePost("title", e.target.value)} />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => onChangePost("body", e.target.value)}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => onChangePost("userId", Number(e.target.value))}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalAddPost;
