import { PostCard } from "../entities/post"
import {
  AddPostDialog,
  EditPostDialog,
  PostDetailDialog,
  PostsContent,
  usePostsModalStore,
  usePostsState,
} from "../feature/posts"
import { UserDetailModal, useUserModal } from "../feature/users"
import { Card } from "../shared"

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
    setSelectedPost,
  } = usePostsModalStore()

  const {
    isOpen: showUserModal,
    userId: selectedUserId,
    openModal: openUserModal,
    onOpenChange: setShowUserModal,
  } = useUserModal()

  if (postsPending) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostCard setShowAddDialog={setShowAddDialog} />
      <PostsContent
        posts={posts || []}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        sortBy={sortBy}
        sortOrder={sortOrder}
        pagination={{
          total: total || 0,
          limit,
          skip,
          setSkip,
          setLimit,
        }}
        onSearchChange={setSearchQuery}
        onTagChange={setSelectedTag}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
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
