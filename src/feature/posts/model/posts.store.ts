import { commentsApi } from "../api/comments.api"
import { postsApi } from "../api/posts.api"
import { usersApi } from "../api/userApi"
import { create } from "zustand"
import { Post } from "./types"
import { User } from "../../users/model/types"
import { Comment } from "../../comments/model/types"

interface PostsStore {
  posts: Post[]
  total: number
  isLoading: boolean
  comments: Record<number, Comment[]>
  selectedPost: Post | null
  selectedComment: Comment | null
  selectedUser: User | null

  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setComments: (postId: number, comments: Comment[]) => void
  setSelectedPost: (post: Post | null) => void
  setSelectedComment: (comment: Comment | null) => void
  setSelectedUser: (user: User | null) => void
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  total: 0,
  isLoading: false,
  comments: {},
  selectedPost: null,
  selectedComment: null,
  selectedUser: null,

  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setLoading: (isLoading) => set({ isLoading }),
  setComments: (postId, comments) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: comments,
      },
    })),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setSelectedComment: (selectedComment) => set({ selectedComment }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  fetchPosts: async (limit: number, skip: number) => {
    set({ isLoading: true })
    try {
      const [postsData, usersData] = await Promise.all([
        postsApi.getPosts(limit, skip),
        usersApi.getUsers({ limit: 0, select: "username, image" }),
      ])
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        user: usersData.users.find((user) => user.id === post.userId),
      }))
      set({ posts: postsWithUsers, total: postsData.total, isLoading: false })
    } catch (error) {
      console.error(error)
      set({ isLoading: false })
    }
  },

  addComment: async (comment: Omit<Comment, "id">) => {
    try {
      const newComment = await commentsApi.addComment(comment)
      set((state) => ({
        comments: {
          ...state.comments,
          [comment.postId]: [
            ...(state.comments[newComment.postId] || []),
            newComment as Comment,
          ],
        },
      }))
    } catch (error) {
      console.error(error)
    }
  },
}))
