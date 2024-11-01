import apiRequest from "@/shared/api";

export const fetchDeletePost = async (postId: number) => {
  try {
    await apiRequest.delete(`/api/posts/${postId}`);
  } catch (error) {
    console.error("게시물 삭제 오류", error);
  }
};
