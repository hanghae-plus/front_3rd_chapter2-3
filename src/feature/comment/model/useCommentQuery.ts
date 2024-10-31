import {
  deleteExistingComment,
  getComments,
  patchLikeComment,
  postNewComment,
  putExistingComment,
} from "../../../entities/comment/api";
import { CommentResponse, Comments, NewComment } from "../../../entities/comment/model/types.ts";

import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";

export const useGetComment = (postId: number | undefined) => {
  return useQuery<CommentResponse | undefined, unknown>({
    queryKey: ["comment", postId],
    queryFn: () => getComments(postId as number),
    enabled: !!postId,
  });
};

export const useAddComment = (options?: UseMutationOptions<Comments | undefined, Error, NewComment>) => {
  return useMutation({
    mutationFn: postNewComment,
    ...options,
  });
};

export const useUpdateComment = (
  options?: UseMutationOptions<Comments | undefined, Error, { id: number; body: string }>,
) => {
  return useMutation({
    mutationFn: ({ id, body }) => putExistingComment(id, body),
    ...options,
  });
};

export const useDeleteComment = (options?: UseMutationOptions<void, Error, { id: number }>) => {
  return useMutation({
    mutationFn: ({ id }) => deleteExistingComment(id),
    ...options,
  });
};

export const useUpdateLike = (
  options?: UseMutationOptions<Comments | undefined, Error, { id: number; body: number }>,
) => {
  return useMutation({
    mutationFn: ({ id, body }) => patchLikeComment(id, body),
    ...options,
  });
};
