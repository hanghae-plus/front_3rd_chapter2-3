import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Post } from "../entities/post/model/type"
import { useComments } from "../features/comments/api/queries"
import { usePostsByTag } from "../features/posts/api/query"
import PostingTable from "../features/posts/ui/PostingTable"
import { useTags } from "../features/tag/api/query"
import { useUsers } from "../features/user/api/query"
import { openModals } from "../shared/lib/modal/openModals"
import { Button } from "../shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card"
import { Input } from "../shared/ui/input"
import { Select } from "../shared/ui/select"

const PostsManager = () => {
  const { post } = openModals
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "all")
  const { data: posts, isLoading } = usePostsByTag({ tag: selectedTag })
  const { data: users } = useUsers()
  const postsWithUsers = posts?.posts.map((post) => ({
    ...post,
    author: users?.users.find((user) => user.id === post.userId),
  }))
  const total = posts?.total
  // 상태 관리
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")

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

  // 태그 가져오기
  const { data: tags } = useTags()

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      return
    }
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
  }

  // 게시물 추가
  const addPost = async () => {}

  // 게시물 업데이트
  const updatePost = async () => {}

  // 게시물 삭제
  const deletePost = async (id) => {}

  // 댓글 가져오기
  const { data: comments } = useComments(selectedPost?.id ?? 1)

  // 댓글 추가
  const addComment = async () => {}

  // 댓글 업데이트
  const updateComment = async () => {}

  // 댓글 삭제
  const deleteComment = async (id, postId) => {}

  // 댓글 좋아요
  const likeComment = async (id, postId) => {}

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
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => post.openAddDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
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
                updateURL()
              }}
              placeholder="태그 선택"
              options={[
                { value: "all", label: "모든 태그" },
                ...(tags?.map((tag) => ({ value: tag.slug, label: tag.slug })) || []),
              ]}
            />
            <Select
              value={sortBy}
              onValueChange={setSortBy}
              placeholder="정렬 기준"
              options={[
                { value: "none", label: "없음" },
                { value: "id", label: "ID" },
                { value: "title", label: "제목" },
                { value: "reactions", label: "반응" },
              ]}
            />
            <Select
              value={sortOrder}
              onValueChange={setSortOrder}
              placeholder="정렬 순서"
              options={[
                { value: "asc", label: "오름차순" },
                { value: "desc", label: "내림차순" },
              ]}
            />
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostingTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={limit.toString()}
                onValueChange={(value) => setLimit(Number(value))}
                placeholder="10"
                options={[
                  { value: "10", label: "10" },
                  { value: "20", label: "20" },
                  { value: "30", label: "30" },
                ]}
              />
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= (total ?? 0)} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
