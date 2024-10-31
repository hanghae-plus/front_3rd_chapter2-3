import { Search } from "lucide-react"
import { Input } from "../../shared/ui/Input"
import { CardContent } from "../../shared/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/Select"
import { fetchPostsByTag } from "../api/fetchPostsByTag"
import { searchPosts } from "../api/searchPosts"
import PostTable from "./PostTable"
import Pagination from "./Pagination"
import { usePost } from "../../features/post/model/usePost"
import { useTag } from "../../features/tags/model/useTag"
import { useUser } from "../../features/user/model/useUser"
import { useUserDialog } from "../../features/user/model/useUserDialog"
import { useEffect, useState } from "react"
import { fetchPosts } from "../api/fetchPosts"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchTags } from "../api/fetchTags"

const PostsManagerContent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    setPosts,
    setTotal,
    skip,
    limit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setSkip,
    setLimit,
  } = usePost()
  const { tags, setTags, selectedTag, setSelectedTag } = useTag()
  const { setSelectedUser } = useUser()
  const { setShowUserModal } = useUserDialog()

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
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="게시물 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && searchPosts({ searchQuery, setLoading, limit, skip, setPosts, setTotal })
                }
              />
            </div>
          </div>
          <Select
            value={selectedTag}
            onValueChange={(value) => {
              setSelectedTag(value)
              fetchPostsByTag({ tag: value, setLoading, limit, skip, setPosts, setTotal })
              updateURL()
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="태그 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 태그</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag.url} value={tag.slug}>
                  {tag.slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">없음</SelectItem>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="title">제목</SelectItem>
              <SelectItem value="reactions">반응</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="정렬 순서" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">오름차순</SelectItem>
              <SelectItem value="desc">내림차순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 게시물 테이블 */}
        {loading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <PostTable updateURL={updateURL} setSelectedUser={setSelectedUser} setShowUserModal={setShowUserModal} />
        )}

        <Pagination />
      </div>
    </CardContent>
  )
}

export default PostsManagerContent
