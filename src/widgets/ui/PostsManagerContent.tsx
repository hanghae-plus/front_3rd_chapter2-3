import { Search } from "lucide-react"
import { Input } from "../../shared/ui/Input"
import { CardContent } from "../../shared/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/Select"
import PostsTable from "../../features/post/ui/PostsTable"
import Pagination from "../../features/post/ui/Pagination"
import { usePost } from "../../features/post/model/usePost"
import { useTag } from "../../features/tags/model/useTag"
import { useUser } from "../../features/user/model/useUser"
import { useUserDialog } from "../../features/user/model/useUserDialog"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchPostsBySearchFetch, fetchPostsByTagFetch, fetchPostsFetch } from "../../entities/post/api"
import { fetchUsersFetch } from "../../entities/user/api"
import { Post } from "../../entities/post/model/types"
import { User } from "../../entities/user/model/types"
import useQueryTags from "../../features/tags/api/useQueryTags"

interface PostsData {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

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
  const { data, error } = useQueryTags()

  useEffect(() => {
    if (!data) return
    setTags(data)
  }, [data])

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
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
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

  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await fetchPostsBySearchFetch(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([fetchPostsByTagFetch(tag), fetchUsersFetch()])
      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  const fetchPosts = () => {
    setLoading(true)
    let postsData: PostsData
    let usersData: User[]

    fetchPostsFetch(limit, skip)
      .then((data) => {
        postsData = data
        return fetchUsersFetch()
      })
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (error) {
    console.error("태그 가져오기 오류:", error)
    return
  }

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
                onKeyPress={(e) => e.key === "Enter" && searchPosts()}
              />
            </div>
          </div>
          <Select
            value={selectedTag}
            onValueChange={(value) => {
              setSelectedTag(value)
              fetchPostsByTag(value)
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
          <PostsTable updateURL={updateURL} setSelectedUser={setSelectedUser} setShowUserModal={setShowUserModal} />
        )}

        <Pagination />
      </div>
    </CardContent>
  )
}

export default PostsManagerContent
