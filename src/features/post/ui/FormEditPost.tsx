import { Post } from "@/entities/post/model/types";
import { Button, Input, Textarea } from "@/shared/ui";
import { useSelectedPost } from "../model/SelectedPostContext";

type FormEditPostProps = {
  close: () => void;
};

const FormEditPost = ({ close }: FormEditPostProps) => {
  const { selectedPost, handleSelectPost } = useSelectedPost();

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
      //   setPosts((prev) => prev.map((post) => (post.id === data.id ? data : post)));
      close();
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  const handleChangePost = (key: keyof Post, value: string | number) => {
    if (!selectedPost) return;
    handleSelectPost({ ...selectedPost, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={selectedPost?.title || ""}
        onChange={(e) => {
          if (!selectedPost) return;
          handleChangePost("title", e.target.value);
        }}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ""}
        onChange={(e) => {
          if (!selectedPost) return;
          handleChangePost("body", e.target.value);
        }}
      />
      <Button onClick={updatePost}>게시물 업데이트</Button>
    </div>
  );
};

export default FormEditPost;
