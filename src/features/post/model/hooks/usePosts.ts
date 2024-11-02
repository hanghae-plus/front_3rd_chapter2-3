import { usePostsQuery } from '@entities/post/api'
import { usePostMutations } from '@entities/post/api'
import { filterStore } from '../stores'

export function usePosts() {
  const { limit, skip, searchQuery, selectedTag } = filterStore()
  const { data, isLoading, error, isError } = usePostsQuery({
    limit,
    skip,
    tag: selectedTag,
    searchQuery,
  })

  const { mutations, state: mutationState } = usePostMutations()

  return {
    posts: data?.posts ?? [],
    total: data?.total ?? 0,
    isLoading: isLoading || mutationState.isPending,
    isError: isError || mutationState.isError,
    error: error || mutationState.error,
    addPost: mutations.addPost,
    updatePost: mutations.updatePost,
    deletePost: mutations.deletePost,
  }
}
