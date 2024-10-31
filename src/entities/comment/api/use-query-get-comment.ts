import { useQuery } from "@tanstack/react-query";
import { CommentType } from "../model/comment-type";
import apiRequest from "@/shared/api";

const fetchCommentList = async (postId: number): Promise<CommentType[]> => {
  try {
    const response = await apiRequest.get(`/api/comments/post/${postId}`);
    return response.data?.comments;
  } catch (error) {
    console.error("댓글 가져오기 오류", error);
    throw error;
  }
};

export const useQueryGetComment = (postId: number) => {
  return useQuery<CommentType[]>({
    queryKey: ["comment-list", { postId }],
    queryFn: () => fetchCommentList(postId),
  });
};
