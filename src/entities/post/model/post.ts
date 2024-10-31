import { atom, useAtom } from "jotai"
import { Reactions } from "../../reactions/model"
import { User } from "../../user/model"

// interface
export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
  author?: User
}

export interface PostsData {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

// usePost
const postsAtom = atom<Post[]>([])
const selectedPostAtom = atom<Post | null>(null)
const showPostDetailDialogAtom = atom<boolean>(false)
const showEditDialogAtom = atom<boolean>(false)

export const usePost = () => {
  const [posts, setPosts] = useAtom<Post[]>(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom<Post | null>(selectedPostAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom<boolean>(showPostDetailDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom<boolean>(showEditDialogAtom)

  return new (class {
    posts = posts
    setPosts = setPosts
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost
    showPostDetailDialog = showPostDetailDialog
    setShowPostDetailDialog = setShowPostDetailDialog
    showEditDialog = showEditDialog
    setShowEditDialog = setShowEditDialog
  })()
}
