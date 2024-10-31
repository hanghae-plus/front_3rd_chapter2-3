export interface NewCommentType {
  body: string;
  postId: number;
  userId: number;
}

export interface CommentType {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
