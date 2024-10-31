import { User } from "../../user/model/types";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
  author?: User;
}

interface Reactions {
  likes: number;
  dislikes: number;
}
