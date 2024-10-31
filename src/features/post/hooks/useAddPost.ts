import { useForm } from 'react-hook-form';

import {
  PostRequests,
  PostsResponse,
} from '../../../entities';
import { usePostStore } from '../../../entities/post/model/usePostStore';
import {
  useCreatePostMutation,
} from '../../../entities/post/queries/usePostMutations';
import { queryClient } from '../../../shared/api/queryClient';
import useDialogStore from '../../../shared/lib/dialog/model/useDialogStore';

export const useAddPost = () => {
  const { closeDialog } = useDialogStore()
  const { posts, setPosts } = usePostStore()

  const { mutate } = useCreatePostMutation((createdPost) => {
    console.log("게시글 생성 성공:", createdPost)
    queryClient.setQueryData<PostsResponse>(["posts"], (oldData) => {
      if (!oldData) {
        return {
          posts: [createdPost],
          total: 1,
          limit: 10,
          skip: 0,
        }
      }

      return {
        ...oldData,
        posts: [createdPost, ...oldData.posts],
        total: oldData.total + 1,
      }
    })
    setPosts([createdPost, ...posts])
    closeDialog("addPost")
    reset()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostRequests["Create"]>({
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
  })

  const onSubmit = (data: PostRequests["Create"]) => {
    mutate(data)
    reset()
  }

  return {
    isSubmitting,
    errors,
    register,
    mutate,
    onSubmit,
    handleSubmit: handleSubmit(onSubmit),
    closeDialog,
  }
}
