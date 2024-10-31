import { useMemo, useState } from "react"
import { Card, CardContent } from "../../../shared/ui"
import PostSearchHeader from "./PostSearchHeader"
import PostSearchFilter from "./PostSeacrFilter"
import PostTable from "./PostTable"
import { Post, PostPayload } from "../../../entities/posts/model/types"
import { User } from "../../../entities/user/model/types"
import { useFilter } from "../../../shared/model/useFilter"
import { Pagination } from "../../../shared/ui/Pagination"
import { PostAddDialog } from "../../../features/posts/ui/PostAddDialog"
import { PostUpdateDialog } from "../../../features/posts/ui/PostUpdateDialog"
import { Comment, CommentPayload } from "../../../entities/comments/model/types"
import { CommentAddDialog } from "../../../features/comments/ui/CommentAddDialog"
import { CommentUpdateDialog } from "../../../features/comments/ui/CommentUpdateDialog"
import { PostDetailDialog } from "./PostDetailDialog"
import { UserDialog } from "../../../entities/user/ui/UserDialog"
import { addPostMutation, updatePostMutation, deletePostMutation } from "../../../features/posts/api"
import {
  addCommentMutation,
  deleteCommentMutation,
  likeCommentMutation,
  updateCommentMutation,
} from "../../../features/comments/api"
import { fetchUser } from "../../../entities/user/api"
import { usePostDialogs } from "../../../features/posts/model/usePostDialogs"
import { useCommentDialogs } from "../../../features/comments/model/useCommentDialogs"
import { useUserDialogs } from "../../../features/users/model/useUserDialogs"
import { usePostManager } from "../../../features/posts/model/usePostManager"

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

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // Queries

  const { posts, postsLoading, searchResults, taggedPosts, users } = usePostManager({
    skip,
    limit,
    searchQuery,
    selectedTag,
  })

  const { mutate: addPostMutate } = addPostMutation()

  const { mutate: updatePostMutate } = updatePostMutation()

  const { mutate: deletePostMutate } = deletePostMutation()

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
  const addPost = (newPost: PostPayload) => {
    addPostMutate(newPost)
    dialogHandlers.handleAddDialog()
  }

  const updatePost = (selectedPost: Post) => {
    updatePostMutate(selectedPost)
    dialogHandlers.handleEditDialog()
  }

  const deletePost = (id: number) => {
    deletePostMutate(id)
  }

  const { mutate: addCommentMutate } = addCommentMutation(selectedPost?.id as number)

  const { mutate: updateCommentMutate } = updateCommentMutation(selectedPost?.id as number)

  const { mutate: deleteCommentMutate } = deleteCommentMutation(selectedPost?.id as number)

  const { mutate: likeCommentMutate } = likeCommentMutation(selectedPost?.id as number)

  const addComment = (newComment: CommentPayload) => {
    addCommentMutate(newComment)
    commentDialogHandlers.handleAddDialog()
  }

  // 핸들러 함수들
  const handlePostDetail = async (post: Post) => {
    setSelectedPost(post)
    dialogHandlers.handlePostDetail()
  }

  const handleUserModal = async (user: User) => {
    const userData = await fetchUser(user.id)

    setSelectedUser(userData)
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
              deletePost={(id) => deletePost(id)}
            />
          )}

          <Pagination skip={skip} limit={limit} total={posts?.total || 0} setSkip={setSkip} setLimit={setLimit} />
        </div>
      </CardContent>

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
      <PostAddDialog isShow={showAddDialog} handleDialog={dialogHandlers.handleAddDialog} addPost={addPost} />
      <PostUpdateDialog
        isShow={showEditDialog}
        handleDialog={dialogHandlers.handleEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={() => selectedPost && updatePost(selectedPost)}
      />
      <CommentAddDialog
        isShow={showAddCommentDialog}
        handleDialog={commentDialogHandlers.handleAddDialog}
        addComment={(newComment: CommentPayload) => addComment(newComment)}
      />
      <CommentUpdateDialog
        isShow={showEditCommentDialog}
        handleDialog={commentDialogHandlers.handleEditDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={() => selectedComment && updateCommentMutate(selectedComment)}
      />
      <UserDialog
        isShow={showDetailDialog}
        handleDialog={userDialogHandlers.handleDetailDialog}
        selectedUser={selectedUser}
      />
    </Card>
  )
}

export default PostsManagerWidget
