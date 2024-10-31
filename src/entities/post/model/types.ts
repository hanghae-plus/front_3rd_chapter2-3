import { UserSummary } from "@/entities/user/model/types";

export type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
  tags: string[];
  author?: UserSummary;
};

export type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export type NewPost = {
  title: string;
  body: string;
  userId: number;
};
