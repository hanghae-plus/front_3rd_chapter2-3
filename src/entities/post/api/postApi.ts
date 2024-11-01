import { Post } from '../model/types';
import { PostsDto, PostDto, NewPostDto, UpdatePostParams, UpdatePostDto } from './types';

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

export const addPost = async (params: Pick<PostDto, 'title' | 'body' | 'userId'>): Promise<NewPostDto> => {
  const response = await fetch('/api/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const newPost = await response.json();
  return newPost as NewPostDto;
};

export const updatePost = async (params: UpdatePostParams): Promise<UpdatePostDto> => {
  const response = await fetch(`/api/posts/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data as UpdatePostDto;
};
