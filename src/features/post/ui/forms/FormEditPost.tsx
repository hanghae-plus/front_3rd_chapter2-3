import { Post } from "@/entities/post/model/types";

import { useGlobalModal } from "@/shared/model/useGlobalModal";
import { Button, Input, Textarea } from "@/shared/ui";

import { useShallow } from "zustand/shallow";
import { useUpdatePost } from "../../api/use-update-post";
import usePostsStore from "../../model/usePostsStore";

const FormEditPost = () => {
  const { closeAll } = useGlobalModal("editPost");
  const { selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );
  const { mutate: updatePost, isPending } = useUpdatePost();

  const handleChangePost = (key: keyof Post, value: string | number) => {
    if (!selectedPost) return;
    handleSelectPost({ ...selectedPost, [key]: value });
  };

  const handleUpdatePost = (post: Post | null) => {
    if (!post) return;
    updatePost(post);
    closeAll();
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
      <Button onClick={() => handleUpdatePost(selectedPost)} disabled={isPending}>
        {isPending ? "업데이트 중..." : "게시물 업데이트"}
      </Button>
    </div>
  );
};

export default FormEditPost;
