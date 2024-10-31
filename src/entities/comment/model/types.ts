import { User } from '../../user/model/type'

export type Comment = {
    id: number
    body: string
    postId: number
    userId: number
    likes: number
    user: User
}