import { PostsQueryFilters } from "../../features/post/model/postStore";

export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: PostsQueryFilters) => [...queryKeys.posts.lists(), filters] as const,
    detail: (id: number) => [...queryKeys.posts.all, id] as const
  },
  comments: {
    all: ['comments'] as const,
    byPost: (postId: number) => [...queryKeys.comments.all, postId] as const,
    detail: (id: number) => [...queryKeys.comments.all, 'detail', id] as const
  },
  tags: {
    all: ['tags'] as const
  }
}