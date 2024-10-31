import { atom, useAtom } from "jotai"
import { NewPost, Post } from "../../../entities/post/model/types"

const postsAtom = atom<Post[]>([])
const selectedPostAtom = atom<Post | null>(null)
const newPostAtom = atom<NewPost>({ title: "", body: "", userId: 1 })
const showAddDialogAtom = atom(false)
const showEditDialogAtom = atom(false)
const showPostDetailDialogAtom = atom(false)

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  return new (class {
    posts = posts
    setPosts = setPosts
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost
    newPost = newPost
    setNewPost = setNewPost
    showAddDialog = showAddDialog
    setShowAddDialog = setShowAddDialog
    showEditDialog = showEditDialog
    setShowEditDialog = setShowEditDialog
    showPostDetailDialog = showPostDetailDialog
    setShowPostDetailDialog = setShowPostDetailDialog
  })()
}
