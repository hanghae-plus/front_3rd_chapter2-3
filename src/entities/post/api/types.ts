import { User } from "../../user/api/types";

export interface Posts {
  posts: EnrichedPost[]
  total: number
  skip: number
  limit: number
}
export interface EnrichedPost extends Post {
  author?: User;
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}

export interface FetchPostsParams {
  limit: number;
  skip: number;
  tag?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Reactions {
  likes: number
  dislikes: number
}
