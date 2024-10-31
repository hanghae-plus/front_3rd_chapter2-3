import { useMutation, useQuery } from "@tanstack/react-query"
import {
  addComment,
  fetchComments,
  updateComment,
  deleteComment,
  likeComment,
} from "../../../entities/comments/api/commentsEntitiesApi"
import { Comments, NewComment } from "../../../entities/comments/model/Comments"

function useFetchComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  })
}

function useAddComment() {
  return useMutation({
    mutationFn: (newComment: NewComment) => addComment(newComment),
  })
}

function useUpdateComment() {
  return useMutation<Comments, Error, Comments>({
    mutationFn: (selectedComment: Comments) => updateComment(selectedComment),
  })
}

function useDeleteComment() {
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
  })
}

function useLikeComment() {
  return useMutation<Comments, Error, { id: number; updateLikes: number }>({
    mutationFn: ({ id, updateLikes }) => likeComment(id, updateLikes),
  })
}

export { useFetchComments, useAddComment, useUpdateComment, useDeleteComment, useLikeComment }
