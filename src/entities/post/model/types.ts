import { User } from '../../user/model/type'

export type Reactions = {
    likes: number,
    dislikes: number
}

export type Post = {
    id: number
    title: string
    body: string
    userId: number
    tags: string[]
    createdAt: string;
    updatedAt: string;
    content: string;
    reactions?: Reactions
    author?: User
}

export type BasePaginationParams = {
    skip: number
    limit: number
}

export type SortOrder = 'asc' | 'desc'