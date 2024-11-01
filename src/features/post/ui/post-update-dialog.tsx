import { PostWithAuthorType } from "@/entities/post/model/post-type";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@/shared/ui";
import { useUpdatePost } from "../model/use-update-post";

interface PostUpdateDialogProps {
  isOpen: boolean;
  close: () => void;
  post: PostWithAuthorType;
}

export const PostUpdateDialog = ({ isOpen, close, post }: PostUpdateDialogProps) => {
  const { newPost, handleChangeNewPost, handleUpdatePost } = useUpdatePost(post);
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={e => handleChangeNewPost("title", e.target.value)}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={newPost.body}
            onChange={e => handleChangeNewPost("body", e.target.value)}
          />
          <Button onClick={() => handleUpdatePost(close)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
