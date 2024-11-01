import apiRequest from "@/shared/api";

export const fetchDeleteComment = async (commentId: number) => {
  try {
    await apiRequest.delete(`/api/comments/${commentId}`);
  } catch (error) {
    console.error(error);
  }
};
