import { NewPost } from "@/entities/post/model/types";

import { useGlobalModal } from "@/shared/model";
import { Button, Input, Textarea } from "@/shared/ui";

import { useState } from "react";
import { useAddPost } from "../../api/use-add-post";

const initialNewPost: NewPost = { title: "", body: "", userId: 1 };

const FormAddPost = () => {
  const { close } = useGlobalModal("addPost");
  const { mutate: addPost } = useAddPost();

  const [newPost, setNewPost] = useState(initialNewPost);

  const handleAddPost = (newPost: NewPost) => {
    addPost(newPost);
    setNewPost(initialNewPost);
    close();
  };

  const handleChangePost = (key: keyof NewPost, value: string | number) => {
    setNewPost((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={newPost.title} onChange={(e) => handleChangePost("title", e.target.value)} />
      <Textarea
        rows={30}
        placeholder="내용"
        value={newPost.body}
        onChange={(e) => handleChangePost("body", e.target.value)}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={newPost.userId}
        onChange={(e) => handleChangePost("userId", Number(e.target.value))}
      />
      <Button onClick={() => handleAddPost(newPost)}>게시물 추가</Button>
    </div>
  );
};

export default FormAddPost;
