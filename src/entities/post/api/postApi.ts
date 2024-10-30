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
