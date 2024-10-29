import { useState } from "react"
import { Posts, SelectedPost, Tag } from "../model/Post"

const usePostState = () => {
  const queryParams = new URLSearchParams(location.search)

  const [posts, setPosts] = useState<Posts>({
    limit: 10,
    skip: 0,
    total: 0,
    posts: [],
  })
  const [selectedPost, setSelectedPost] = useState<SelectedPost | null>(null)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [loading, setLoading] = useState(false)

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
  }
}

export default usePostState
