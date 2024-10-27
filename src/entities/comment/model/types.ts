export type CommentResponse = {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
};

export type Comment = {
  body: string;
  id: number;
  likes: number;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};
