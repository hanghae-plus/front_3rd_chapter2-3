import { Post } from "@entities/post/model"

export const selectedPostValue = {
  initial: {
    id: -1,
    body: "",
    reactions: { likes: 0, dislikes: 0 },
    tags: [],
    title: "",
    userId: -1,
    views: 0,
  } as Post
} 