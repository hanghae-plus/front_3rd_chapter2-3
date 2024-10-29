import { Post } from "@/entities/post/model/types";

import { Button, Input, Textarea } from "@/shared/ui";
import { useShallow } from "zustand/shallow";
import usePostsStore from "../../model/usePostsStore";

type FormEditPostProps = {
  close: () => void;
};

const FormEditPost = ({ close }: FormEditPostProps) => {
  const { updatePost, loading, selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      updatePost: state.updatePost,
      loading: state.loading,
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );

  const handleChangePost = (key: keyof Post, value: string | number) => {
    if (!selectedPost) return;
    handleSelectPost({ ...selectedPost, [key]: value });
  };

  const handleUpdatePost = (post: Post | null) => {
    if (!post) return;
    updatePost(post);
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
      <Button onClick={() => handleUpdatePost(selectedPost)} disabled={loading}>
        {loading ? "업데이트 중..." : "게시물 업데이트"}
      </Button>
    </div>
  );
};

export default FormEditPost;
