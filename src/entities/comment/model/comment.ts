import { CommonResDto } from "../../../shared/model";
// import { UserType } from "../../user";

export interface CommentType {
  id: number;
  postId: number;
//   user: UserType;
  body: string;
  likes: number;
}

export interface CommentListResDto extends CommonResDto<CommentType> {}
