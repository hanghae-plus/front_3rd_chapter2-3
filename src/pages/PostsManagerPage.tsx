import {
  Card,
  CardContent,
} from "../shared"
import { Pagination } from "../feature/posts/ui/components/Controls/Pagination"
import { PostTable } from "../feature/posts/ui/components/PostTable"
import {
  AddPostDialog,
  EditPostDialog,
  PostDetailDialog,
} from "../feature/posts/ui/components/PostDialogs"
import { PostFilters } from "../feature/posts/ui"
import { UserDetailModal } from "../feature/users/ui"
import { PostCard } from "../entities/post/ui/components/PostCard/PostCard"
import { usePostsState } from "../feature/posts/lib/hooks/usePostsState"
import { usePostsModalStore } from "../feature/posts/model/stores/postsStore"
import { useUserModal } from "../feature/users/lib/hooks/useUserModal"

const PostsManager = () => {
  const {
    posts,
    total,
    isPending: postsPending,
    pagination: { skip, limit, setSkip, setLimit },
    filters: {
      searchQuery,
      sortBy,
      sortOrder,
      selectedTag,
      setSearchQuery,
      setSortBy,
      setSortOrder,
      setSelectedTag,
    },
  } = usePostsState()

  const {
    showAddDialog,
    showEditDialog,
    showPostDetailDialog,
    selectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setShowPostDetailDialog,
    setSelectedPost
  } = usePostsModalStore()

  const {
    isOpen: showUserModal,
    userId: selectedUserId,
    openModal: openUserModal,
    onOpenChange: setShowUserModal
  } = useUserModal()

  if (postsPending) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostCard setShowAddDialog={setShowAddDialog} />
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
            onPostDetail={(post) => {
              setSelectedPost(post)
              setShowPostDetailDialog(true)
            }}
            onPostEdit={(post) => {
              setSelectedPost(post)
              setShowEditDialog(true)
            }}
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
      <UserDetailModal 
        userId={selectedUserId}
        open={showUserModal}
        onOpenChange={setShowUserModal}
      />
    </Card>
  )
}

export default PostsManager
