import { UserDto } from '~/entities/user/model/types';

export type CommentResponseDto = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: UserDto;
};

export interface CommentsResponseDto {
  comments: CommentResponseDto[];
  total: number;
  skip: number;
  limit: number;
}

export type CommentRequestDto = {
  body: string;
  postId: null;
  userId: number;
};

export type Comment = CommentResponseDto;
export type Comments = Comment[];
