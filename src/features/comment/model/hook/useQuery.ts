import { useMutation, useQuery } from "@tanstack/react-query";
import { commentApis } from "../../../../entities/comment/api";

export function useFetchCommentQuery(postId: number) {
  return useQuery({
    queryKey: ["comment", postId],
    queryFn: () => commentApis.fetchComments(postId),
  });
}

export function useEditCommentMutation() {
  return useMutation({
    mutationFn: (reqBody: CommentDetail) => commentApis.editComment(reqBody),
  });
}

export function useDeleteCommentMutation() {
  return useMutation({
    mutationFn: (commentId: number) => commentApis.deleteComment(commentId),
  });
}

export function useLikeCommentMutation() {
  return useMutation({
    mutationFn: (req: { id: number; likes: number }) => commentApis.likeComment(req),
  });
}
