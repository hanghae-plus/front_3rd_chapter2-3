import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import PostsManagerHeader from "./ui/PostsManagerHeader"
import PostsManagerContent from "./ui/PostsManagerContent"
import AddPostDialog from "./ui/AddPostDialog"
import UpdatePostDialog from "./ui/UpdatePostDialog"
import AddCommentDialog from "./ui/AddCommentDialog"
import UpdateCommentDialog from "./ui/UpdateCommentDialog"
import PostDetailDialog from "./ui/PostDetailDialog"
import UserModal from "./ui/UserModal"
import { Card } from "../shared/ui/Card"
import { fetchPosts } from "./api/fetchPosts"
import { fetchTags } from "./api/fetchTags"
import { fetchPostsByTag } from "./api/fetchPostsByTag"
import { usePost } from "../features/post/model/usePost"
import { useTag } from "../features/tags/model/useTag"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 상태 관리
  const {
    setPosts,
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
  } = usePost()
  const { setTags, selectedTag, setSelectedTag } = useTag()

  const [loading, setLoading] = useState(false)

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  useEffect(() => {
    fetchTags(setTags)
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag({ tag: selectedTag, setLoading, limit, skip, setPosts, setTotal })
    } else {
      fetchPosts({ setLoading, limit, skip, setPosts, setTotal })
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsManagerHeader />
      <PostsManagerContent setLoading={setLoading} updateURL={updateURL} loading={loading} />

      <AddPostDialog />

      <UpdatePostDialog />

      <AddCommentDialog />

      <UpdateCommentDialog />
      <PostDetailDialog />

      <UserModal />
    </Card>
  )
}

export default PostsManager
