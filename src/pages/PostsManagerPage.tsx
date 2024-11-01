import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Table } from "../shared/ui/Table"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/Card"
import { AddPostButton } from "../features/post/ui/AddPostButton"
import { SearchArea } from "../widgets/post/ui/SearchArea"
import { TagFilterSelect } from "../widgets/tag/ui/TagFilterSelect"
import { SortKeySelect } from "../widgets/post/ui/SortKeySelect"
import { SortDirectionSelect } from "../widgets/post/ui/SortDirectionSelect"
import { User } from "../entities/user/model/type"
import { PostTableRows } from "../widgets/post/ui/PostTableRows"
import { Post, Tag } from "../entities/post/model/type"
import { PostTableHeader } from "../widgets/post/ui/PostTableHeader"
import { PaginationSelect } from "../widgets/post/ui/PaginationSelect"
import { PaginationControls } from "../widgets/post/ui/PaginationControls"
import { AddPostDialog } from "../widgets/post/ui/AddPostDialog"
import { EditPostDialog } from "../widgets/post/ui/EditPostDialog"
import {
  Comment,
  CommentsByPost,
  NewComment,
} from "../entities/comment/model/type"
import { AddCommentDialog } from "../widgets/comment/ui/AddCommentDialog"
import { UpdateCommentDialog } from "../widgets/comment/ui/UpdateCommentDialog"
import { DetailPostDialog } from "../widgets/post/ui/DetailPostDialog"
import { UserInfoDialog } from "../widgets/user/ui/UserInfoDialog"
import { fetchPosts } from "../entities/post/api/post"
import { useListNavigation } from "../features/post/lib/usePostNavigation"
import { fetchTags } from "../entities/tag/api/api"

const PostsManager = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState<number>(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || "",
  )
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortKey, setSortKey] = useState(queryParams.get("sortKey") || "")
  const [sortOrder, setSortOrder] = useState(
    queryParams.get("sortOrder") || "asc",
  )
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [comments, setComments] = useState<CommentsByPost>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({
    body: "",
    postId: null,
    userId: 1,
  })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // URL 업데이트 함수
  const updateURL = useListNavigation()

  const handleFetchPosts = useCallback(() => {
    fetchPosts(limit, skip, setLoading, setPosts, setTotal)
  }, [limit, skip, setLoading, setPosts, setTotal])

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts(limit, skip, setLoading, setPosts, setTotal)
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

  // 태그별 게시물 가져오기
  const fetchPostsByTag = useCallback(
    async (tag: string) => {
      if (!tag || tag === "all") {
        handleFetchPosts()
        return
      }
      setLoading(true)
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch(`/api/posts/tag/${tag}`),
          fetch("/api/users?limit=0&select=username,image"),
        ])
        const postsData = await postsResponse.json()
        const usersData = await usersResponse.json()

        const postsWithUsers = postsData.posts.map((post: Post) => ({
          ...post,
          author: usersData.users.find((user: User) => user.id === post.userId),
        }))

        setPosts(postsWithUsers)
        setTotal(postsData.total)
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
      }
      setLoading(false)
    },
    [limit, skip],
  )

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    if (selectedPost === null) return null

    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    if (selectedComment === null) return
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id)
      if (!comment) {
        console.error("댓글을 찾을 수 없습니다")
        return
      }

      const newLikes = comment.likes + 1

      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likes: newLikes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update comment likes")
      }

      // 상태 업데이트 전 현재 상태 로깅
      setComments((prev) => {
        const updatedComments = {
          ...prev,
          [postId]:
            prev[postId]?.map((comment) =>
              comment.id === id ? { ...comment, likes: newLikes } : comment,
            ) || [],
        }

        return updatedComments
      })
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
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
    const loadTags = async () => {
      const tagData = await fetchTags()
      setTags(tagData)
    }

    loadTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      handleFetchPosts()
    }
  }, [selectedTag, fetchPostsByTag, handleFetchPosts])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostButton setShowAddDialog={setShowAddDialog} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchArea
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchPosts={searchPosts}
              />
            </div>

            <TagFilterSelect
              tags={tags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              fetchPostsByTag={fetchPostsByTag}
              updateURL={updateURL}
            />

            <SortKeySelect sortKey={sortKey} setSortKey={setSortKey} />

            <SortDirectionSelect
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <Table>
              <PostTableHeader />

              <PostTableRows
                posts={posts}
                selectedTag={selectedTag}
                searchQuery={searchQuery}
                setSelectedTag={setSelectedTag}
                updateURL={updateURL}
                openUserModal={openUserModal}
                openPostDetail={openPostDetail}
                setSelectedPost={setSelectedPost}
                setShowEditDialog={setShowEditDialog}
                deletePost={deletePost}
              />
            </Table>
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <PaginationSelect limit={limit} setLimit={setLimit} />

            <PaginationControls
              skip={skip}
              limit={limit}
              total={total}
              setSkip={setSkip}
            />
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <UpdateCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <DetailPostDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        comments={comments}
        likeComment={likeComment}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        deleteComment={deleteComment}
      />

      {/* 사용자 모달 */}
      <UserInfoDialog
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
        selectedUser={selectedUser}
      />
    </Card>
  )
}

export default PostsManager
