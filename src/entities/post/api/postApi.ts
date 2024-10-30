import { Post } from '../model/types';
import { PostsDto } from './types';

interface GetPostsParams {
  limit: number;
  skip: number;
}

export const getPosts = async ({ limit, skip }: GetPostsParams): Promise<PostsDto> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  const data = await response.json();
  return data;
};

export const deletePost = (id: Post['id']) => {
  return fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
};
