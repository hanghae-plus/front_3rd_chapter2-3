import { PostsQueryProps, usePostsQuery } from './queries'
import { usePostMutations } from './mutations'

export function usePosts({ limit, skip, tag, searchQuery }: PostsQueryProps) {
  const { data, isLoading, error, isError } = usePostsQuery({
    limit,
    skip,
    tag,
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
