export interface PostDto {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  reactions: { likes: number; dislikes: number };
  views: number;
}

export interface PostsDto {
  limit: number;
  skip: number;
  total: number;
  posts: PostDto[];
}

export type NewPostDto = Pick<PostDto, 'title' | 'body' | 'userId' | 'id'>;
