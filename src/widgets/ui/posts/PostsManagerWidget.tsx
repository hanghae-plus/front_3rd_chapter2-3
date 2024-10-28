import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent } from "../../../shared/ui"
import PostSearchHeader from "./PostSearchHeader"
import PostSearchFilter from "./PostSeacrFilter"
import PostTable from "./PostTable"
import { Post, Comment, PostPayload } from "../../../entities/posts/model/types"
import { User } from "../../../entities/user/model/types"
import {
  fetchPosts,
  fetchPostsByTag,
  searchPosts,
  addPost,
  updatePost,
  deletePost,
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
} from "../../../entities/posts/api"
import { fetchUsers, fetchUserById, fetchUser } from "../../../entities/user/api"
import { useFilter } from "../../../shared/model/useFilter"
import { Pagination } from "../../../shared/ui/Pagination"
import { PostAddDialog } from "../../../features/posts/ui/PostAddDialog"
import { PostUpdateDialog } from "../../../features/posts/ui/PostUpdateDialog"
import { CommentPayload } from "../../../entities/comments/model/types"

const PostsManagerWidget = () => {
  const queryClient = useQueryClient()

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
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  // 선택된 항목 상태
  const [newPost, setNewPost] = useState<PostPayload>({ title: "", body: "", userId: 1 })
  const [newComment, setNewComment] = useState<CommentPayload>({ body: "", postId: 1, userId: 1 })
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // Queries
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts", limit, skip, sortBy, sortOrder],
    queryFn: () => fetchPosts(limit, skip),
    enabled: !searchQuery && selectedTag === "all",
  })

  const { data: searchResults } = useQuery({
    queryKey: ["posts", "search", searchQuery],
    queryFn: () => searchPosts(searchQuery),
    enabled: !!searchQuery,
  })

  const { data: taggedPosts } = useQuery({
    queryKey: ["posts", "tag", selectedTag],
    queryFn: () => fetchPostsByTag(selectedTag),
    enabled: selectedTag !== "all",
  })

  const { data: comments } = useQuery({
    queryKey: ["comments", selectedPost?.id],
    queryFn: () => (selectedPost ? fetchComments(selectedPost.id) : null),
    enabled: !!selectedPost,
  })

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  // Mutations
  const addPostMutation = useMutation({
    mutationFn: (newPost: PostPayload) => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      setShowAddDialog(false)
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: (selectedPost: Post) => updatePost(selectedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      setShowEditDialog(false)
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", selectedPost?.id] })
      setShowAddCommentDialog(false)
    },
  })

  //   const updateCommentMutation = useMutation({
  //     mutationFn: (post: Post) => updateComment(post),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["comments", selectedPost?.id] })
  //       setShowEditCommentDialog(false)
  //     },
  //   })

  //   const deleteCommentMutation = useMutation({
  //     mutationFn: deleteComment,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["comments", selectedPost?.id] })
  //     },
  //   })

  //   const likeCommentMutation = useMutation({
  //     mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["comments", selectedPost?.id] })
  //     },
  //   })

  // 핸들러 함수들
  const handlePostDetail = async (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleUserModal = async (user: User) => {
    const userData = await fetchUser(user.id)
    setSelectedUser(userData)
    setShowUserModal(true)
  }

  // 현재 표시할 posts 결정
  const displayPosts = searchQuery ? searchResults?.posts : selectedTag !== "all" ? taggedPosts?.posts : posts?.posts

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostSearchHeader handleDialog={() => setShowAddDialog(true)} />

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
              posts={displayPosts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={handleUserModal}
              openPostDetail={handlePostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletePost={(id) => deletePostMutation.mutate(id)}
            />
          )}

          <Pagination skip={skip} limit={limit} total={posts?.total || 0} setSkip={setSkip} setLimit={setLimit} />
        </div>
      </CardContent>

      <PostAddDialog
        isShow={showAddDialog}
        handleDialog={() => setShowAddDialog(false)}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={() => addPostMutation.mutate(newPost)}
      />
      <PostUpdateDialog
        isShow={showEditDialog}
        handleDialog={() => setShowEditDialog(false)}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={() => selectedPost && updatePostMutation.mutate(selectedPost)}
      />
    </Card>
  )
}

export default PostsManagerWidget
