import { useEffect, useState, useCallback } from "react"
import { Plus } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Loading,
  Pagination,
} from "../shared/ui"
import { Post } from "../entity/post/model"
import { User } from "../entity/user/model"
import { Comment } from "../entity/comment/model"
import { PostTable } from "../features/posts/components/PostTable"
import { PostFilters } from "../features/posts/components/PostFilters"
import { PostDialog } from "../features/posts/components/PostDialog"
import { PostDetailDialog } from "../features/posts/components/PostDetailDialog"
import { CommentDialog } from "../features/comments/components/CommentDialog"
import { UserModal } from "../features/users/components/UserModal"

import { usePostsManager } from "../features/posts/hooks/usePostsManager"
import { useCommentsManager } from "../features/comments/hooks/useCommentsManager"
import { useQueryParams } from "../shared/lib/hooks/useQueryParams"
import { highlightText } from "../shared/lib/utils/text"

const PostsManager = () => {
  const { updateURL } = useQueryParams()
  const {
    posts,
    total,
    loading,
    skip,
    limit,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    tags,
    setSkip,
    setLimit,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    fetchPosts,
    searchPosts,
    fetchPostsByTag,
    deletePost,
    addPost,
    updatePost,
    fetchTags,
  } = usePostsManager()

  const {
    comments,
    selectedComment,
    setSelectedComment,
    setNewComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
  } = useCommentsManager()

  // Dialog 상태 관리
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const openUserModal = async (userId: number): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData: User = await response.json();
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchPosts()
    fetchTags()
  }, [fetchPosts, fetchTags])

  useEffect(() => {
    updateURL({
      skip: skip.toString(),
      limit: limit.toString(),
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag,
    })
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag, updateURL])

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    if (tag === "all") {
      fetchPosts()
    } else {
      fetchPostsByTag(tag)
    }
    updateURL({
      tag
    })
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
          <PostFilters
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            tags={tags}
            onSearch={(value) => {
              setSearchQuery(value);
              if (value !== searchQuery) return;
              searchPosts();
            }}
            onTagChange={handleTagChange}
            onSortByChange={(value) => setSortBy(value)}
            onSortOrderChange={(value) => setSortOrder(value)}
          />

          {loading ? (
            <Loading />
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onOpenDetail={(post) => {
                setSelectedPost(post);
                fetchComments(post.id);
                setShowPostDetailDialog(true);
              }}
              onEdit={(post) => {
                setSelectedPost(post);
                setShowEditDialog(true);
              }}
              onDelete={deletePost}
              highlightText={highlightText}
              onUserClick={openUserModal}
              onTagSelect={(tag) => {
                setSelectedTag(tag);
                fetchPostsByTag(tag);
                updateURL({
                  skip: skip.toString(),
                  limit: limit.toString(),
                  search: searchQuery,
                  sortBy,
                  sortOrder,
                  tag
                });
              }}
            />
          )}

          <Pagination
            limit={limit}
            skip={skip}
            total={total}
            onLimitChange={setLimit}
            onSkipChange={setSkip}
          />
        </div>
      </CardContent>

      <PostDialog
        isOpen={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={addPost}
        mode="add"
      />

      <PostDialog
        isOpen={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onSubmit={updatePost}
        mode="edit"
      />

      <PostDetailDialog
        isOpen={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        comments={selectedPost ? comments[selectedPost.id] || [] : []}
        searchQuery={searchQuery}
        onAddComment={() => {
          if (selectedPost?.id) {
            setNewComment({
              body: "",
              postId: selectedPost.id,
              userId: 1
            });
            setShowAddCommentDialog(true);
          }
        }}
        onEditComment={(comment) => {
          setSelectedComment(comment);
          setShowEditCommentDialog(true);
        }}
        onDeleteComment={(commentId) => {
          if (selectedPost?.id) {
            deleteComment(commentId, selectedPost.id);
          }
        }}
        highlightText={highlightText}
      />

      <CommentDialog
        isOpen={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        postId={selectedPost?.id}
        onSubmit={(commentData) => {
          if (selectedPost?.id) {
            const commentWithPostId = {
              ...commentData,
              postId: selectedPost.id
            };
            addComment(commentWithPostId);
            setShowAddCommentDialog(false);
          }
        }}
        mode="add"
      />

      <CommentDialog
        isOpen={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        comment={selectedComment || undefined}
        onSubmit={async (comment) => {
          if ('id' in comment) {
            await updateComment(comment as Comment);
          }
        }}
        mode="edit"
      />

      <UserModal
        isOpen={showUserModal}
        onOpenChange={setShowUserModal}
        user={selectedUser}
      />
    </Card>
  )
}

export default PostsManager
