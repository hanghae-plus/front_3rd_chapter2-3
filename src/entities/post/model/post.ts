import { CommonResDto } from "../../../shared/model";
import { UserType } from "../../user";

export interface PostType {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
  author?: UserType;
}

export interface TagType {
  url: string;
  slug: string;
  name: string;
}

export interface PostListResDto extends CommonResDto<PostType> {}
