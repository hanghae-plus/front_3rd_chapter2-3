import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "../shared/ui"
import PostsHeader from "../widgets/post/PostsHeader"
import PostsContent from "../widgets/post/PostsContent"
import PostAddDialog from "../widgets/post/PostAddDialog"
import PostUpdateDialog from "../widgets/post/PostUpdateDialog"
import CommentAddDialog from "../widgets/comments/CommentAddDialog"
import CommentUpdateDialog from "../widgets/comments/CommentUpdateDialog"
import { Post } from "../entities/post/model/type"
import { Tag } from "../entities/tag/model/type"
import { Comments, NewComment, Comment } from "../entities/comment/model/type"
import { User } from "../entities/user/model/type"
import PostDetailDialog from "../widgets/post/PostDetailDialog"
import UserModal from "../widgets/user/UserModal"
import { UsersData } from "../features/user/model/type"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // interface
  interface PostsData {
    posts: Post[]
    total: number
    skip: number
    limit: number
  }

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
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [comments, setComments] = useState<Comments>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
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
  const fetchPosts = () => {
    setLoading(true)
    let postsData: PostsData

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        // API 응답 구조가 맞는지 확인
        if (!data.posts || typeof data.total !== "number") {
          throw new Error("Invalid posts data format")
        }
        postsData = data as PostsData // 타입 단언
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        // API 응답 구조가 맞는지 확인
        if (!users.users) {
          throw new Error("Invalid users data format")
        }
        const usersData: UsersData = users as UsersData // 타입 단언
        const postsWithUsers = postsData.posts.map((post: Post) => ({
          ...post,
          author: usersData.users.find((user: User) => user.id === post.userId) || null,
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
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
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
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

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsHeader setShowAddDialog={setShowAddDialog} />
      <PostsContent
        searchQuery={searchQuery}
        fetchPosts={fetchPosts}
        setLoading={setLoading}
        setPosts={setPosts}
        setTotal={setTotal}
        posts={posts}
        comments={comments}
        setComments={setComments}
        setSelectedPost={setSelectedPost}
        setShowPostDetailDialog={setShowPostDetailDialog}
        setSelectedUser={setSelectedUser}
        setShowUserModal={setShowUserModal}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        updateURL={updateURL}
        setShowEditDialog={setShowEditDialog}
        setSearchQuery={setSearchQuery}
        fetchPostsByTag={fetchPostsByTag}
        tags={tags}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        loading={loading}
        limit={limit}
        setLimit={setLimit}
        skip={skip}
        setSkip={setSkip}
        total={total}
      />

      <PostAddDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        setPosts={setPosts}
        posts={posts}
      />

      <PostUpdateDialog
        selectedPost={selectedPost}
        setPosts={setPosts}
        posts={posts}
        setShowEditDialog={setShowEditDialog}
        showEditDialog={showEditDialog}
        setSelectedPost={setSelectedPost}
      />

      <CommentAddDialog
        newComment={newComment}
        setComments={setComments}
        setShowAddCommentDialog={setShowAddCommentDialog}
        setNewComment={setNewComment}
        showAddCommentDialog={showAddCommentDialog}
      />

      <CommentUpdateDialog
        selectedComment={selectedComment}
        setComments={setComments}
        setShowEditCommentDialog={setShowEditCommentDialog}
        showEditCommentDialog={showEditCommentDialog}
        setSelectedComment={setSelectedComment}
      />
      <PostDetailDialog
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        comments={comments}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
        setComments={setComments}
      />

      <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager
