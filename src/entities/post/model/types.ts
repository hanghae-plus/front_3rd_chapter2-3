import { User } from "../../user/model/types";

interface Reaction {
    likes: number;
    dislikes: number;
};


export interface Post {
    body: string;
    id: number;
    reactions: Reaction;
    tags: string[];
    title: string;
    userId: number;
    views: number;
}

export interface ReqUpdatePost extends Post {
    author: User;
}

export type ReqNewPost = Pick<Post, 'body' | 'title' | 'userId'>;