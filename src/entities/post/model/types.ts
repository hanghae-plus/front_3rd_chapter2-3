import { User } from "@/entities/user/model/types";

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
  author?: Pick<User, "id" | "username" | "image">;
};

export type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};
