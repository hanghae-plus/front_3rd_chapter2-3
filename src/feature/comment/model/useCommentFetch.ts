import {
  deleteExistingComment,
  getComments,
  patchLikeComment,
  postNewComment,
  putExistingComment,
} from "../../../entities/comment/api";
import useCustomQuery from "../../../shared/model/useCustomQuery.ts";
import useCustomMutation from "../../../shared/model/useCustomMutation.ts";
import { Comments, NewComment } from "../../../entities/comment/model/types.ts";

export const useCommentFetch = () => {
  const useGetComment = (postId: number) => {
    return useCustomQuery(["comment", postId], () => getComments(postId));
  };

  const useAddComment = () => {
    return useCustomMutation<Comments | undefined, Error, NewComment>((newComment) => postNewComment(newComment), {
      onError: (error) => {
        console.error("댓글 추가 실패:", error);
      },
    });
  };

  const useUpdateComment = () => {
    return useCustomMutation<Comments | undefined, Error, { id: number; body: string }>(
      ({ id, body }) => putExistingComment(id, body),
      {
        onError: (error) => {
          console.error("댓글 업데이트 실패:", error);
        },
      },
    );
  };

  const useDeleteComment = () => {
    return useCustomMutation<unknown, Error, { id: number }>(({ id }) => deleteExistingComment(id), {
      onError: (error) => {
        console.error("댓글 삭제 실패:", error);
      },
    });
  };

  const useUpdateLike = () => {
    return useCustomMutation<Comments | undefined, Error, { id: number; likes: number }>(
      ({ id, likes }) => patchLikeComment(id, likes),
      {
        onError: (error) => {
          console.error("좋아요 업데이트 실패:", error);
        },
      },
    );
  };

  return { useGetComment, useAddComment, useUpdateComment, useDeleteComment, useUpdateLike };
};
