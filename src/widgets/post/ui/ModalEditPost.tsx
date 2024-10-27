import { Post } from "@/pages/PostsManagerPage";
import { Button, Dialog, Input, Textarea } from "@/shared/ui";

type ModalEditPostProps = {
  showEditDialog: boolean;
  setShowEditDialog: (open: boolean) => void;
  selectedPost: Post | null;
  updatePost: () => void;
  onChangePost: (key: keyof Post, value: string) => void;
};

const ModalEditPost = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  updatePost,
  onChangePost,
}: ModalEditPostProps) => {
  return (
    <Dialog.Container open={showEditDialog} onOpenChange={setShowEditDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => {
              if (!selectedPost) return;
              onChangePost("title", e.target.value);
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => {
              if (!selectedPost) return;
              onChangePost("body", e.target.value);
            }}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditPost;
