import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@/shared/ui";
import useAddPost from "@/features/addPost/model/use-add-post";

interface AddDialogProps {
  isOpen: boolean;
  close: () => void;
}

const AddPostDialog = ({ isOpen, close }: AddDialogProps) => {
  const { newPost, updateNewPost, addPost } = useAddPost();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={e => updateNewPost("title", e.target.value)}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={e => updateNewPost("body", e.target.value)}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={e => updateNewPost("userId", Number(e.target.value))}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostDialog;
