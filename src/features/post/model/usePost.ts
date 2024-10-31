import { atom, useAtom } from "jotai"
import { NewPost, Post } from "../../../entities/post/model/types"

const postsAtom = atom<Post[]>([])
const selectedPostAtom = atom<Post | null>(null)
const newPostAtom = atom<NewPost>({ title: "", body: "", userId: 1 })
const showAddDialogAtom = atom(false)
const showEditDialogAtom = atom(false)
const showPostDetailDialogAtom = atom(false)

const totalAtom = atom(0)
const skipAtom = atom(0)
const limitAtom = atom(10)
const searchQueryAtom = atom("")
const sortByAtom = atom("")
const sortOrderAtom = atom("asc")

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  const [total, setTotal] = useAtom(totalAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

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

    total = total
    setTotal = setTotal
    skip = skip
    setSkip = setSkip
    limit = limit
    setLimit = setLimit
    searchQuery = searchQuery
    setSearchQuery = setSearchQuery
    sortBy = sortBy
    setSortBy = setSortBy
    sortOrder = sortOrder
    setSortOrder = setSortOrder
  })()
}
