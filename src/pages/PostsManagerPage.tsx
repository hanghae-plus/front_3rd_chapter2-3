import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Comment, CreateCommentRequest, fetchComments } from "../entities/comment"
import { CreatePostRequest, fetchPosts, fetchPostsByTag, PostTag, PostWithUser } from "../entities/post"
import { fetchTags } from "../entities/tag/api/get"
import { UserData } from "../entities/user/model/types"
import { updatePost } from "../features/posts/api/editPostApi"
import AddPostDialog from "../features/posts/ui/AddPostDialog"
import EditPostDialog from "../features/posts/ui/EditPostDialog"
import { PostsPagination } from "../features/posts/ui/PostPagination"
import UserInfoModal from "../features/user/ui/UserInfoModal"
import { Button } from "../shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card"
import { Input } from "../shared/ui/input"
import { Select } from "../shared/ui/select"
import PostTable from "../widgets/PostTable/ui/PostTable"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리 - 개별 타입 적용
  const [posts, setPosts] = useState<PostWithUser[]>([])
  const [total, setTotal] = useState<number>(0)
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null)
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">((queryParams.get("sortOrder") as "asc" | "desc") || "asc")
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false)
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [newPost, setNewPost] = useState<CreatePostRequest>({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<PostTag[]>([])
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "")
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<CreateCommentRequest>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false)
  const [showUserModal, setShowUserModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

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

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 상세 보기
  const openPostDetail = (post: PostWithUser): void => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: UserData): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData: UserData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

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
    setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
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
                  placeholder="게시물 검..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              placeholder="태그 선택"
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
                updateURL()
              }}
              options={[
                { value: "all", label: "모든 태그" },
                ...tags.map((tag) => ({ value: tag.slug, label: tag.slug })),
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
              onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
              placeholder="정렬 순서"
              options={[
                { value: "asc", label: "오름차순" },
                { value: "desc", label: "내림차순" },
              ]}
            />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
            />
          )}

          {/* 페이지네이션 */}
          <PostsPagination
            total={total}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
            setLimit={setLimit}
            updateURL={updateURL}
          />
        </div>
      </CardContent>
      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
      />
      <EditPostDialog
        isOpen={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />
      <UserInfoModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager
