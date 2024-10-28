import { usePostContext } from "@/entities/post/model/PostContext";
import { useSelectedPost } from "@/entities/post/model/SelectedPostContext";
import { Post } from "@/entities/post/model/types";

import useUpdatePost from "@/features/post/lib/useUpdatePost";

import { Button, Input, Textarea } from "@/shared/ui";

type FormEditPostProps = {
  close: () => void;
};

const FormEditPost = ({ close }: FormEditPostProps) => {
  const { selectedPost, handleSelectPost } = useSelectedPost();
  const { setPosts } = usePostContext();
  const { mutateAsync, loading } = useUpdatePost();

  const handleChangePost = (key: keyof Post, value: string | number) => {
    if (!selectedPost) return;
    handleSelectPost({ ...selectedPost, [key]: value });
  };

  const updatePost = async (post: Post | null) => {
    if (!post) return;
    const updatedPost = await mutateAsync(post);
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    close();
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={selectedPost?.title || ""}
        onChange={(e) => {
          handleChangePost("title", e.target.value);
        }}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ""}
        onChange={(e) => {
          handleChangePost("body", e.target.value);
        }}
      />
      <Button onClick={() => updatePost(selectedPost)} disabled={loading}>
        {loading ? "업데이트 중..." : "게시물 업데이트"}
      </Button>
    </div>
  );
};

export default FormEditPost;
