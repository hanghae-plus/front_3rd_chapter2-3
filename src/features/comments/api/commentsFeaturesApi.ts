import { useMutation, useQuery } from "@tanstack/react-query"
import {
  addComment,
  fetchComments,
  updateComment,
  deleteComment,
  likeComment,
} from "../../../entities/comments/api/commentsEntitiesApi"
import { Comments, NewComment } from "../../../entities/comments/model/Comments"

const useFetchComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    staleTime: 0,
    gcTime: 600000,
    enabled: true,
  })
}

const useAddComment = () => {
  return useMutation({
    mutationFn: (newComment: NewComment) => addComment(newComment),
  })
}

const useUpdateComment = () => {
  return useMutation<Comments, Error, Comments>({
    mutationFn: (selectedComment: Comments) => updateComment(selectedComment),
  })
}

const useDeleteComment = () => {
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
  })
}

const useLikeComment = () => {
  return useMutation<Comments, Error, { id: number; updateLikes: number }>({
    mutationFn: ({ id, updateLikes }) => likeComment(id, updateLikes),
  })
}

export { useFetchComments, useAddComment, useUpdateComment, useDeleteComment, useLikeComment }
