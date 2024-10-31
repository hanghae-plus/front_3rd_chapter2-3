import { create } from "zustand"
import { AddPostParamsType, PostType } from "../api/types"
import { devtools } from "zustand/middleware"

import useTableStore from "../../../features/table/model/useTableStore"

import { fetchAddPost, fetchGetPost } from "../api/postApi"

interface PostStoreType {
  isLoading: boolean
  error: boolean
  skip: number
  posts: PostType[]
  updatePosts: (newPosts: PostType[]) => void
  editOnePost: (newPost: PostType) => void
  deletePost: (postId: PostType["id"]) => void
  addPost: (newPost: PostType) => void
  fetchPosts: () => Promise<void>
  fetchAddPost: (newPost: AddPostParamsType) => Promise<void>
}

const usePostStore = create<PostStoreType>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: false,
      skip: 0,
      posts: [],
      updatePosts: (newPosts) => set({ posts: newPosts }),
      editOnePost: (newPost) =>
        set((state) => {
          const newPosts = state.posts.map((post) => (post.id === newPost.id ? newPost : post))

          return { posts: newPosts }
        }),
      deletePost: (postId) =>
        set((state) => {
          const newPosts = state.posts.filter((post) => post.id !== postId)

          return { posts: newPosts }
        }),

      addPost: (newPost) => set((state) => ({ posts: [...state.posts, newPost] })),
      fetchPosts: async () => {
        set({ isLoading: true, error: false })

        try {
          const { limit } = useTableStore.getState()
          const { skip } = usePostStore.getState()
          const result = await fetchGetPost(limit, skip)

          set({ isLoading: false, posts: result?.posts, skip: skip + limit })
        } catch (error) {
          console.dir(error)
          set({ isLoading: false, error: true })
        }
      },
      fetchAddPost: async (newPost: AddPostParamsType) => {
        set({ isLoading: true, error: false })

        try {
          const result = await fetchAddPost(newPost)
          console.log(result)
        } catch (error) {
          console.dir(error)
          set({ isLoading: false, error: true })
        }
      },
    }),
    { name: "postStore" },
  ),
)

export default usePostStore
