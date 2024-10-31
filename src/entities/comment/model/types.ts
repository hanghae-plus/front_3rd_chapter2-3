export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    // todo: 아 User 가져오고 싶다.
    id: number;
    username: string;
    fullName: string;
  };
}

export interface CommentResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}
