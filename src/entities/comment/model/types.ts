//https://feature-sliced.design/kr/docs/guides/examples/types
export interface Comment<
  TUser extends { id: number; username: string; fullName: string }
> {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: Pick<TUser, 'id' | 'username' | 'fullName'>;
}
export interface CommentResponse<
  TUser extends { id: number; username: string; fullName: string }
> {
  comments: Comment<TUser>[];
  total: number;
  skip: number;
  limit: number;
}
