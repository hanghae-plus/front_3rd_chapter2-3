export type PostRequestDto = {
  title: string;
  body: string;
  userId: number;
};

export interface PostsResponseDto {
  posts: PostResponseDto[];
  total: number;
  skip: number;
  limit: number;
}

export type PostResponseDto = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: Reactions;
  views: number;
};

export interface Reactions {
  likes: number;
  dislikes: number;
}
