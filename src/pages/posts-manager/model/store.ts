import { atom } from "jotai"
import type { Post } from "@/entities/post/model/types"
import type { Comment } from "@/entities/comment/model/types"
import type { User } from "@/entities/user/model/types"

interface PostsManagerState {
  pagination: {
    currentPage: number
    itemsPerPage: number
  }
  filters: {
    search: string
    tag: string
    sortBy: string
    sortOrder: "asc" | "desc"
  }
  dialogs: {
    addPost: boolean
    editPost: boolean
    postDetail: boolean
    addComment: boolean
    editComment: boolean
    userInfo: boolean
  }
  selected: {
    post: Post | null
    comment: Comment | null
    user: User | null
  }
}

const initialState: PostsManagerState = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
  filters: {
    search: "",
    tag: "",
    sortBy: "",
    sortOrder: "desc",
  },
  dialogs: {
    addPost: false,
    editPost: false,
    postDetail: false,
    addComment: false,
    editComment: false,
    userInfo: false,
  },
  selected: {
    post: null,
    comment: null,
    user: null,
  },
}

export const postsManagerState = atom<PostsManagerState>(initialState)
