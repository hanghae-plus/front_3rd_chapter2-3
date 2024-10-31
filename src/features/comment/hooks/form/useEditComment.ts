import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { commentApi } from '../../../../entities/comment/api/commentApi';
import {
  CommentRequests,
} from '../../../../entities/comment/model/commentTypes';
import {
  useCommentStore,
} from '../../../../entities/comment/model/useCommentStore';
import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';

interface UseEditCommentProps {
  commentId: number
  postId: number
  defaultValues: CommentRequests["Update"]
}

export const useEditComment = ({ commentId, postId, defaultValues }: UseEditCommentProps) => {
  const { closeDialog } = useDialogStore()
  const { comments, setComments } = useCommentStore()
  console.log(comments, "comments")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentRequests["Update"]>({
    defaultValues,
  })

  const editCommentMutation = useMutation({
    mutationFn: (data: CommentRequests["Update"]) => commentApi.updateComment(commentId, data),
    onSuccess: (updatedComment) => {
      const updatedComments = comments.map((comment) => {
        if (comment.postId === postId && comment.id === commentId) {
          return {
            ...comment,
            body: updatedComment.body,
          }
        }
        return comment
      })

      setComments(updatedComments)
      reset()
      closeDialog("editComment")
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    await editCommentMutation.mutate(data)
  })

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
    isPending: editCommentMutation.isPending,
  }
}
