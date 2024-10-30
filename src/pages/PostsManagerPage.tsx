import { useEffect, useState } from "react"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from "../shared/ui"
import { NewPost, Post } from "../entities/post/model/types"
import { fetchUserApi, fetchUsersApi } from "../entities/user/api"
import {
  fecthPostsByTagApi,
  fetchPostsApi,
  searchPostsApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from "../entities/post/api"
import { fetchTagsApi } from "../entities/tag/api"
import { Tag } from "../entities/tag/model/types"
import { addToPosts, attachAuthorsFromUsers, removeFromPosts, updateInPosts } from "../entities/post/model/utils"
import { User } from "../entities/user/model/types"
import { PostSearch } from "../features/post/ui/PostSearch"
import { ContentSearch } from "../widgets/ui/ContentSearch"
import { ContentControls } from "../widgets/ui/ContentControls"
import { Contents } from "../widgets/ui/Contents"
import { ContentFilter } from "../widgets/ui/ContentFilter"
import { PostFilter } from "../features/post/ui/PostFilter"
import { Pagination } from "../widgets/ui/Pagination"
import { PostTable } from "../entities/post/ui/PostTable"
import { PostAddDialog } from "../features/post/ui/PostAddDialog"
import { PostUpdateDialog } from "../features/post/ui/PostUpdateDialog"
import { Comment, NewComment } from "../entities/comment/model/types"
import { CommentAddDialog } from "../features/comment/ui/CommentAddDialog"
import { CommentUpdateDialog } from "../features/comment/ui/CommentUpdateDialog"
import { PostDetailDialog } from "../entities/post/ui/PostDetailDialog"
import { UserDetailDialog } from "../entities/user/ui/UserDetailDialog"

const initialNewPost: NewPost = { title: "", body: "", userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } }
const initialNewComment: NewComment = { body: "", postId: null, userId: 1 }
const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ ...initialNewPost })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [comments, setComments] = useState({})
  const [selectedComment, setSelectedComment] = useState<Comment>(null)
  const [newComment, setNewComment] = useState<NewComment>({ ...initialNewComment })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

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

  // 게시물 가져오기
  const getPosts = async (limit = 0, skip = 0) => {
    setLoading(true)
    const usersData = await fetchUsersApi()
    const postsData = await fetchPostsApi({ limit, skip })
    const postsWithUsers = attachAuthorsFromUsers(postsData.posts, usersData.users)
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  // 태그 가져오기
  const getTags = async () => {
    const tagsData = await fetchTagsApi()
    setTags(tagsData)
  }

  // 게시물 검색
  const getSearchedPosts = async (searchQuery = "") => {
    setLoading(true)
    const usersData = await fetchUsersApi()
    const postsData = await searchPostsApi(searchQuery)
    const postsWithUsers = attachAuthorsFromUsers(postsData.posts, usersData.users)
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const getTaggedPosts = async (tag = "all") => {
    if (!tag || tag === "all") {
      getPosts(limit, skip)
      return
    }
    setLoading(true)
    const usersData = await fetchUsersApi()
    const postsData = await fecthPostsByTagApi(tag)
    const postsWithUsers = attachAuthorsFromUsers(postsData.posts, usersData.users)
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async (newPost: NewPost) => {
    const postData = await createPostApi(newPost)
    setPosts(addToPosts(posts, postData))
    setShowAddDialog(false)
    setNewPost({ ...initialNewPost })
  }

  // 게시물 업데이트
  const updatePost = async (updatingPost: Post) => {
    const postData = await updatePostApi(updatingPost)
    setPosts(updateInPosts(posts, postData))
    setShowEditDialog(false)
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deletePostApi(id)
    setPosts(removeFromPosts(posts, id))
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
  const addComment = async (newComment: NewComment) => {
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
      setNewComment({ ...initialNewComment })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async (updatingComment: Comment) => {
    try {
      const response = await fetch(`/api/comments/${updatingComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: updatingComment.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
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
  const likeComment = async (id, postId) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
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
  const openUserModal = async (userId: number) => {
    const userData = await fetchUserApi(userId)
    setSelectedUser(userData)
    setShowUserModal(true)
  }

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      getTaggedPosts(selectedTag)
    } else {
      getPosts(limit, skip)
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
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
        <Contents>
          {/* 검색 및 필터 컨트롤 */}
          <ContentControls>
            <ContentSearch>
              <PostSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                getSearchedPosts={getSearchedPosts}
              />
            </ContentSearch>
            <ContentFilter>
              <PostFilter
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                getTaggedPosts={getTaggedPosts}
                updateURL={updateURL}
                tags={tags}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
                sortOrder={sortOrder}
              />
            </ContentFilter>
          </ContentControls>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              updateURL={updateURL}
              setSelectedTag={setSelectedTag}
              setSelectedPost={setSelectedPost}
              openUserModal={openUserModal}
              setShowEditDialog={setShowEditDialog}
              openPostDetail={openPostDetail}
              deletePost={deletePost}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination skip={skip} limit={limit} total={total} setSkip={setSkip} setLimit={setLimit} />
        </Contents>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      {selectedPost && (
        <PostUpdateDialog
          showEditDialog={showEditDialog}
          setShowEditDialog={setShowEditDialog}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          updatePost={updatePost}
        />
      )}

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      {selectedComment && (
        <CommentUpdateDialog
          showEditCommentDialog={showEditCommentDialog}
          setShowEditCommentDialog={setShowEditCommentDialog}
          selectedComment={selectedComment}
          setSelectedComment={setSelectedComment}
          updateComment={updateComment}
        />
      )}

      {/* 게시물 상세 보기 대화상자 */}
      {selectedPost && (
        <PostDetailDialog
          showPostDetailDialog={showPostDetailDialog}
          setShowPostDetailDialog={setShowPostDetailDialog}
          selectedPost={selectedPost}
          searchQuery={searchQuery}
          renderComments={renderComments}
        />
      )}

      {/* 사용자 모달 */}
      {selectedUser && (
        <UserDetailDialog
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
          selectedUser={selectedUser}
        />
      )}
    </Card>
  )
}

export default PostsManager
