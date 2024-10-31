import {
  Post,
  PostsResponse,
  useDeletePostMutation,
} from '../../../entities';
import { usePostStore } from '../../../entities/post/model/usePostStore';
import { queryClient } from '../../../shared';
import { useSearchStore } from '../../postSearch/model/useSearchStore';
import { usePostsWithUsersQuery } from './usePostsWithUsersQuery';

export const usePostTable = ({ currentPost }: { currentPost: Post }) => {
  usePostsWithUsersQuery()
  const { posts, setPosts } = usePostStore()

  const { mutate } = useDeletePostMutation(() => {
    setPosts(
      posts.filter((post: Post) => {
        console.log(post.id, currentPost.id)
        return post.id !== currentPost.id
      }),
    )
    queryClient.setQueryData<PostsResponse>(["posts", useSearchStore.getState()], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        posts: oldData.posts.filter((post) => post.id !== currentPost.id),
        total: oldData.total - 1,
      }
    })
  })

  return {
    mutate,
  }
}
