import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"
import {
  limitAtom,
  loadingAtom,
  newPostAtom,
  postsAtom,
  searchQueryAtom,
  selectedPostAtom,
  selectedTagAtom,
  showAddDialogAtom,
  showEditDialogAtom,
  showPostDetailDialogAtom,
  skipAtom,
  sortByAtom,
  sortOrderAtom,
  tagsAtom,
  totalAtom,
} from "../../features/posts/model/postAtoms"
const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [tags, setTags] = useAtom(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [total, setTotal] = useAtom(totalAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const navigate = useNavigate()

  function updateURL() {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery.toString())
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  return {
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    newPost,
    setNewPost,
    tags,
    setTags,
    selectedTag,
    setSelectedTag,
    showPostDetailDialog,
    setShowPostDetailDialog,
    total,
    setTotal,
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    loading,
    setLoading,
    updateURL,
  }
}

export default usePost
