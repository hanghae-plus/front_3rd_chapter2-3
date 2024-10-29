export interface User {
    id: number;
    image: string;
    username: string;
}

export type CommentUser = Pick<User, 'id' | 'username'> & {
    fullName: string;
};