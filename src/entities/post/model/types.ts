import { User } from "../../user/model/types.ts";
import { ResponseData } from "../../../types.ts";

export interface Post {
  author?: User;
  id: number;
  body: string;
  reactions?: {
    likes: number;
    dislikes: number;
  };
  tags?: string[];
  title: string;
  userId: number;
  views?: number;
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponse extends ResponseData {
  posts: Post[];
}

export interface Tag {
  name: string;
  slug: string;
  url: string;
}
