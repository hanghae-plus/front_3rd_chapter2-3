import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../shared"
import {
  useDeletePostMutation,
  usePostsQuery,
  useSearchPostsQuery,
} from "../feature/posts/lib/hooks/usePostsQuery"
import { Pagination } from "../feature/posts/ui/components/Controls/Pagination"
import { PostTable } from "../feature/posts/ui/components/PostTable"
import {
  AddPostDialog,
  EditPostDialog,
  PostDetailDialog,
} from "../feature/posts/ui/components/PostDialogs"
import { PostFilters } from "../feature/posts/ui"
import { useURLParams } from "../feature/posts/lib/hooks/useURLParams"

const PostsManager = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

   // URL 관련 상태만 유지
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  // 다이얼로그 상태
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  // 선택된 항목 상태
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  // 데이터 쿼리
  const { data: postsData, isPending: postsPending } = usePostsQuery(limit, skip)
  const { data: searchedData } = useSearchPostsQuery(searchQuery)
  const deletePostMutation = useDeletePostMutation()
  const { updateURL } = useURLParams()

  // 실제 표시할 posts와 total 계산
  const posts = searchQuery ? searchedData?.posts : postsData?.posts
  const total = searchQuery ? searchedData?.total : postsData?.total

  // 게시물 삭제
  const deletePost = async (id) => {
    try {
      await deletePostMutation.mutateAsync(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    updateURL({
      skip,
      limit,
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag
    })
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  if (postsPending) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

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
          <PostFilters
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSearchChange={setSearchQuery}
            onTagChange={setSelectedTag}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {/* 게시물 테이블 */}
          <PostTable
            posts={posts}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            onPostDetail={openPostDetail}
            onPostEdit={(post) => {
              setSelectedPost(post)
              setShowEditDialog(true)
            }}
            onPostDelete={deletePost}
            onUserClick={openUserModal}
          />

          {/* 페이지네이션 */}
          <Pagination
            total={total}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
            setLimit={setLimit}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        limit={limit}
        skip={skip}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => {
          setShowAddDialog(false)
        }}
      />
      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onSuccess={() => setShowEditDialog(false)}
      />
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
      />

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedUser?.image}
              alt={selectedUser?.username}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold text-center">
              {selectedUser?.username}
            </h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName}{" "}
                {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address},{" "}
                {selectedUser?.address?.city}, {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} -{" "}
                {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager
