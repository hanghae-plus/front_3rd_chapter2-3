import { UserType } from "@/entities/user/model/user-type";

export interface PostType {
  id: number;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

export interface PostWithAuthorType extends PostType {
  author: UserType;
}

export interface PostListTotal {
  postList: PostWithAuthorType[];
  total: number;
}

export interface PostListType {
  limit: number;
  skip: number;
  total: number;
  posts: PostType[];
}

export interface PostItemType {
  post: PostWithAuthorType;
}
