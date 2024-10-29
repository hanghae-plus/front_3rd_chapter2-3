import { ResponseData } from "../../../types.ts";

export interface NewComment {
  body: string;
  postId: number | null;
  userId: number;
}

export interface Comments {
  body: string;
  id: number;
  likes: number;
  postId: number;
  user: {
    fullName: string;
    id: number;
    username: string;
  };
}

export interface CommentResponse extends ResponseData {
  comments: Comments[];
}
