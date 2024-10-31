import {
  Edit2,
  MessageSquare,
  Plus,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { usePostQueryParams, usePostsQuery } from "../entities/post"
import { usePostsQueryProps } from "../entities/post/api/usePostsQuery"
import { Author, Post } from "../entities/post/model/types"
import { userApi } from "../entities/user/api/userApi"
import { UserDTO } from "../entities/user/model/types"
import { useDeletePostMutation } from "../features/post"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextHighlighter,
} from "../shared/ui"
import {
  PostAddDialog,
  PostDetailDialog,
  PostEditDialog,
  PostFilterBar,
} from "../widgets/post"
import { Pagination } from "../widgets/ui/Pagination"
import { UserModal } from "../widgets/user"

const PostsManager = () => {
  const {
    queryParams: { limit, search, skip, sortBy, sortOrder, tag: selectedTag },
    updateQueryParam,
  } = usePostQueryParams()
  const [searchQuery, setSearchQuery] = useState(search)

  // 상태 관리
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null)

  const payload: usePostsQueryProps = {
    limit,
    skip,
    search: searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
  }

  const {
    data: { posts, total },
    isLoading,
  } = usePostsQuery(payload)

  const { mutate: deletePostMutate } = useDeletePostMutation()

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: Author) => {
    const userData = await userApi.fetchUser(user.id)
    if (userData) {
      setSelectedUser(userData)
      setShowUserModal(true)
    }
  }

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>
                  <TextHighlighter text={post.title} highlight={searchQuery} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        updateQueryParam({ tag })
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && openUserModal(post.author)}
              >
                <img
                  src={post.author?.image}
                  alt={post.author?.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openPostDetail(post)}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePostMutate(post.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

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
          <PostFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            updateQueryParam={updateQueryParam}
          />

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            renderPostTable()
          )}

          <Pagination
            limit={limit}
            skip={skip}
            total={total}
            updateQueryParam={updateQueryParam}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        search={searchQuery}
        selectedPost={selectedPost}
      />

      {/* 사용자 모달 */}
      {selectedUser && (
        <UserModal
          open={showUserModal}
          onOpenChange={setShowUserModal}
          selectedUser={selectedUser}
        />
      )}
    </Card>
  )
}

export default PostsManager
