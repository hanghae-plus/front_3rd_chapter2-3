import { Comment } from "../model/types";

export const withDefaultLikes = (comment: Comment) => ({
  ...comment,
  likes: comment.likes ?? 0,
});
