import { useCommonMutation } from '../../../shared/lib/query/useCommonMutation';
import { postApi } from '../api/postApi';
import {
  Post,
  PostRequests,
} from '../model/postTypes';

export const useCreatePostMutation = (onSuccess?: (data: Post) => void) => {
  return useCommonMutation<Post, PostRequests["Create"]>({
    mutationFn: postApi.createPost,
    onSuccessCallback: onSuccess,
  })
}

export const useUpdatePostMutation = (id: number, onSuccess?: (data: Post) => void) => {
  return useCommonMutation<Post, PostRequests["Update"]>({
    mutationFn: (data) => postApi.updatePost(id, data),
    onSuccessCallback: onSuccess,
  })
}

export const useDeletePostMutation = (onSuccess?: (data: unknown) => void) => {
  return useCommonMutation<unknown, number>({
    mutationFn: postApi.deletePost,
    onSuccessCallback: onSuccess,
  })
}
