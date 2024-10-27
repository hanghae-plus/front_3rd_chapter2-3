import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { usePosts } from "../../features/post/model"
import { NewPost, Post } from "../../entities/post/model/types"
import { User } from "../../entities/user/model/types"

interface PostContextType {
  posts: Post[]
  showAddDialog: boolean
  setShowAddDialog: (show: boolean) => void
  selectedPost: Post | null
  setSelectedPost: (post: Post | null) => void
  showEditDialog: boolean
  setShowEditDialog: (show: boolean) => void
  newPost: NewPost
  setNewPost: (post: NewPost) => void
  total: number
  addPost: () => void
  updatePost: () => void
  deletePost: (postId: number) => void
  getPostsByTag: (tag: string) => void
  getSearchedPosts: (searchQuery: string) => void
  getPosts: (limit: number, skip: number, users: User[]) => void

  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
  openPostDetail: (post: Post) => void
}

const PostContext = createContext<PostContextType | null>(null)

export const PostContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const postHookValues = usePosts()
  const value = useMemo(() => ({ ...postHookValues }), [postHookValues])

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export const usePostsContext = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider")
  }

  return context
}
