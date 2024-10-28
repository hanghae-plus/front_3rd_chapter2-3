import { usePostContext } from "@/entities/post/model/PostContext";
import { NewPost } from "@/entities/post/model/types";

import { Button, Input, Textarea } from "@/shared/ui";

import { useState } from "react";

type FormAddPostProps = {
  close: () => void;
};

const initialNewPost: NewPost = { title: "", body: "", userId: 1 };

const FormAddPost = ({ close }: FormAddPostProps) => {
  const [newPost, setNewPost] = useState(initialNewPost);
  const { actions } = usePostContext();

  const handleAddPost = async (newPost: NewPost) => {
    await actions.addPost(newPost);
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
