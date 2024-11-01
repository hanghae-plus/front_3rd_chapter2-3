import { NewPostDto, UpdatePostDto } from '../api/types';
import { Post } from '../model/types';

export const transformNewPost = (post: NewPostDto): Post => {
  return {
    ...post,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  };
};

export const transformUpdatedPost = (post: UpdatePostDto): Post => {
  return {
    ...post,
    views: 0,
  };
};
