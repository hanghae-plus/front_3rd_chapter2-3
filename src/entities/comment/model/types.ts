import { CommentUser } from "../../user/model/types";

export interface Comment {
    body: string;
    id: number;
    likes: number;
    postId: number | null;
    user: CommentUser;
}

export type NewComment = Pick<Comment, 'body' | 'postId'> & {
    userId: number;
};

export type ResFetchComments = {
    comments: Comment;
    limit: number;
    skip: number;
    total: number;
}

export type ResAddComment = Omit<Comment, 'likes'>;

export type ReqUpdateComment = Pick<Comment, 'body'>;
