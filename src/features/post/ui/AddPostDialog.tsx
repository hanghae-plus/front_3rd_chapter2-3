import { DialogContainer } from "../../../shared/ui/Dialog";
import { usePostsStore } from "../store/usePostsStore";
import { Button, Input, Textarea } from "../../../shared/ui";
import { useState } from "react";
import { useAddPostMutation } from "../model/hook/useQuery";

export default function AddPostDialog() {
  const [newPost, setNewPost] = useState<ReqAddPostBody>(DEFAULT_NEW_POST);

  const { mutateAsync: addPost } = useAddPostMutation();

  const { title, body, userId } = newPost;

  const { showAddPostDialog, setShowAddPostDialog } = usePostsStore();

  const handleChangeAddPostInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setNewPost({ ...newPost, [name]: name === "userId" ? Number(value) : value });
  };

  const handleClickAddPostButton = () => {
    addPost(newPost);
    setShowAddPostDialog(false);
    setNewPost(DEFAULT_NEW_POST);
  };

  return (
    <DialogContainer open={showAddPostDialog} title={"새 게시물 추가"} onOpenChange={setShowAddPostDialog}>
      <div className="space-y-4">
        <Input placeholder="제목" name="title" value={title} onChange={handleChangeAddPostInput} />
        <Textarea rows={30} name="body" placeholder="내용" value={body} onChange={handleChangeAddPostInput} />
        <Input type="number" name="userId" placeholder="사용자 ID" value={userId} onChange={handleChangeAddPostInput} />
        <Button onClick={handleClickAddPostButton}>게시물 추가</Button>
      </div>
    </DialogContainer>
  );
}

const DEFAULT_NEW_POST: ReqAddPostBody = {
  title: "",
  body: "",
  userId: 1,
};
