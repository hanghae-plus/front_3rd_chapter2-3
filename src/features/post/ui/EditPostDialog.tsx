import { Button, DialogContainer, Input, Textarea } from "../../../shared/ui";
import { useEditPostMutation } from "../model/hook/useQuery";
import { usePostsStore } from "../store/usePostsStore";
import { useEffect, useState } from "react";

export function EditPostDialog() {
  const { selectedPost, showEditDialog, setSelectedPost, setShowEditPostDialog } = usePostsStore();

  const [updatePost, setUpdatePost] = useState(selectedPost);

  const { mutateAsync: editPost } = useEditPostMutation();

  const handleChangeEditPostInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!updatePost) {
      return;
    }
    const { value, name } = e.target;
    setUpdatePost({ ...updatePost, [name]: value });
  };

  const handleClickEditPostButton = async () => {
    if (!updatePost) {
      return;
    }
    await editPost(updatePost);

    setSelectedPost(updatePost);
    setShowEditPostDialog(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    setUpdatePost(selectedPost);
  }, [selectedPost]);

  return (
    <DialogContainer open={showEditDialog} onOpenChange={setShowEditPostDialog} title="게시물 수정">
      <div className="space-y-4">
        <Input placeholder="제목" name="title" value={updatePost?.title || ""} onChange={handleChangeEditPostInput} />
        <Textarea
          rows={15}
          name="body"
          placeholder="내용"
          value={updatePost?.body || ""}
          onChange={handleChangeEditPostInput}
        />
        <Button onClick={handleClickEditPostButton}>게시물 업데이트</Button>
      </div>
    </DialogContainer>
  );
}
