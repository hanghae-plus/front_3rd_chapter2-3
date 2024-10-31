import { NewPostDto } from '../api/types';
import { Post } from '../model/types';

export const transformNewPost = (newPost: NewPostDto): Post => {
  return {
    ...newPost,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  };
};
