import { useMemo } from "react"
import { Card, CardContent } from "../../../shared/ui"
import PostSearchHeader from "./PostSearchHeader"
import PostSearchFilter from "./PostSeacrFilter"
import PostTable from "./PostTable"
import { Post } from "../../../entities/posts/model/types"
import { User } from "../../../entities/user/model/types"
import { useFilter } from "../../../shared/model/useFilter"
import { Pagination } from "../../../shared/ui/Pagination"
import { PostAddDialog } from "../../../features/posts/ui/PostAddDialog"
import { PostUpdateDialog } from "../../../features/posts/ui/PostUpdateDialog"
import { CommentPayload } from "../../../entities/comments/model/types"
import { CommentAddDialog } from "../../../features/comments/ui/CommentAddDialog"
import { CommentUpdateDialog } from "../../../features/comments/ui/CommentUpdateDialog"
import { PostDetailDialog } from "./PostDetailDialog"
import { UserDialog } from "../../../entities/user/ui/UserDialog"
import {
  addCommentMutation,
  deleteCommentMutation,
  likeCommentMutation,
  updateCommentMutation,
} from "../../../features/comments/api"
import { usePostDialogs } from "../../../features/posts/model/usePostDialogs"
import { useCommentDialogs } from "../../../features/comments/model/useCommentDialogs"
import { useUserDialogs } from "../../../features/users/model/useUserDialogs"
import { usePostManager } from "../../../features/posts/model/usePostManager"
import { usePostSelectionStates } from "../../../features/posts/model/usePostSelectionStates"

const PostsManagerWidget = () => {
  // useFilter 훅 사용
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    skip,
    setSkip,
    limit,
    setLimit,
    updateURL,
  } = useFilter()

  // 다이얼로그 상태
  const { showAddDialog, showEditDialog, showPostDetailDialog, handlers: dialogHandlers } = usePostDialogs()
  const {
    showAddDialog: showAddCommentDialog,
    showEditDialog: showEditCommentDialog,
    handlers: commentDialogHandlers,
  } = useCommentDialogs()
  const { showDetailDialog, handlers: userDialogHandlers } = useUserDialogs()

  // 선택된 항목 상태
  const { selectedPost, setSelectedPost, selectedUserId, setSelectedUserId, selectedComment, setSelectedComment } =
    usePostSelectionStates()

  // Queries
  const { posts, postsLoading, searchResults, taggedPosts, users } = usePostManager({
    skip,
    limit,
    searchQuery,
    selectedTag,
  })

  // posts에 author 추가
  const postsWithUsers = useMemo(() => {
    if (selectedTag === "all") {
      return posts?.posts.map((post) => ({
        ...post,
        author: users?.users.find((user) => user.id === post.userId),
      }))
    } else {
      return taggedPosts?.posts.map((post) => ({
        ...post,
        author: users?.users.find((user) => user.id === post.userId),
      }))
    }
  }, [posts, users, taggedPosts])

  // Mutations

  const { mutate: deleteCommentMutate } = deleteCommentMutation(selectedPost?.id as number)

  const { mutate: likeCommentMutate } = likeCommentMutation(selectedPost?.id as number)

  // 핸들러 함수들
  const handlePostDetail = async (post: Post) => {
    setSelectedPost(post)
    dialogHandlers.handlePostDetail()
  }

  const handleUserModal = async (user: User) => {
    setSelectedUserId(user.id)
    userDialogHandlers.handleDetailDialog()
  }

  // 현재 표시할 posts 결정
  const displayPosts = searchQuery ? searchResults?.posts : selectedTag !== "all" ? taggedPosts?.posts : postsWithUsers

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostSearchHeader handleDialog={dialogHandlers.handleAddDialog} />

      <CardContent>
        <div className="flex flex-col gap-4">
          <PostSearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            updateURL={updateURL}
          />

          {postsLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={displayPosts || []}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={handleUserModal}
              openPostDetail={handlePostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={dialogHandlers.handleEditDialog}
            />
          )}

          <Pagination skip={skip} limit={limit} total={posts?.total || 0} setSkip={setSkip} setLimit={setLimit} />
        </div>
      </CardContent>

      {showPostDetailDialog && (
        <PostDetailDialog
          isShow={showPostDetailDialog}
          handleDialog={dialogHandlers.handlePostDetail}
          selectedPost={selectedPost}
          likeComment={() => selectedComment && likeCommentMutate(selectedComment)}
          deleteComment={() => selectedComment && deleteCommentMutate(selectedComment.id)}
          searchQuery={searchQuery}
          setSelectedComment={setSelectedComment}
          setShowEditCommentDialog={commentDialogHandlers.handleEditDialog}
          handleAddComment={commentDialogHandlers.handleAddDialog}
        />
      )}
      {showAddDialog && (
        <PostAddDialog isShow={showAddDialog} handleDialog={dialogHandlers.handleAddDialog} addPost={addPost} />
      )}
      {showEditDialog && selectedPost && (
        <PostUpdateDialog
          isShow={showEditDialog}
          handleDialog={dialogHandlers.handleEditDialog}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
      {showAddCommentDialog && selectedPost && (
        <CommentAddDialog
          isShow={showAddCommentDialog}
          selectedPostId={selectedPost.id}
          handleDialog={commentDialogHandlers.handleAddDialog}
        />
      )}
      {showEditCommentDialog && selectedComment && (
        <CommentUpdateDialog
          isShow={showEditCommentDialog}
          handleDialog={commentDialogHandlers.handleEditDialog}
          selectedComment={selectedComment}
          selectedPostId={selectedPost?.id as number}
          setSelectedComment={setSelectedComment}
        />
      )}
      {selectedUserId && (
        <UserDialog
          isShow={showDetailDialog}
          handleDialog={userDialogHandlers.handleDetailDialog}
          selectedUserId={selectedUserId}
        />
      )}
    </Card>
  )
}

export default PostsManagerWidget
