import { CommentUser } from "../../user/model/types";

export interface Comment {
    body: string;
    id: number;
    likes: number;
    postId: number;
    user: CommentUser;
}

export type ReqNewComment = Pick<Comment, 'body' | 'postId'> & {
    userId: number;
};

export type ReqUpdateComment = Pick<Comment, 'body'>;