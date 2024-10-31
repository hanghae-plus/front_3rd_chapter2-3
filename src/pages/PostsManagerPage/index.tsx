import { useEffect, useState } from "react"
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui"
import { Author, Comment, CommentId, NewComment, NewPost, Post, PostComments, PostId } from "@/shared/types"
import { PostAddDialog, PostAddDialogOpenButton } from "@/features/post-add-dialog"
import { CommentEditDialog, CommentEditDialogOpenButton } from "@/features/comment-edit-dialog"
import { CommentAddDialog, CommentAddDialogOpenButton } from "@/features/comment-add-dialog"
import { PostEditDialog, PostEditDialogOpenButton } from "@/features/post-edit-dialog"
import { highlightText } from "@/shared/lib"
import { UserDetailDialog, UserDetailDialogOpenButton } from "@/features/user-detail-dialog"
import { PostDetailDialog, PostDetailDialogOpenButton } from "@/features/post-detail-dialog"
import Pagination from "@/shared/ui/Pagination"
import { PostsSearch } from "@/features/search-posts"
import { useAtom } from "jotai"
import { QueryProvider } from "@/pages/PostsManagerPage/store"
import { loadingAtom } from "@/shared/model"
import { postsAtom } from "@/entities/post"
import { PostsTagFilter } from "@/features/posts-tag-filter"
import { tagAtom } from "@/entities/tag"

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [loading, setLoading] = useAtom<boolean>(loadingAtom)

  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery] = useState<string>(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useAtom<string>(tagAtom)

  const [posts, setPosts] = useAtom<Post[]>(postsAtom)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })
  const [total, setTotal] = useState<number>(0)

  const [comments, setComments] = useState<PostComments>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

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
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: Author) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      const defaultPost = {
        id: 0,
        title: "",
        body: "",
        tags: ["history"],
        reactions: {
          likes: 0,
          dislikes: 0,
        },
        views: 0,
        userId: 1,
        author: {
          id: 1,
          username: "emilys",
          image: "https://dummyjson.com/icon/emilys/128",
        },
      }
      const createdPost = { ...defaultPost, ...data }
      setPosts([createdPost, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return
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
  const deletePost = async (postId: PostId) => {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: PostId) => {
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
    if (!selectedComment) return
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
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
  const deleteComment = async (commentId: CommentId, postId: PostId) => {
    try {
      await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== commentId),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (commentId: CommentId, postId: PostId, comments: PostComments) => {
    try {
      if (!comments) return
      if (!comments[postId]) return
      const targetComment = comments[postId].find((c) => c.id === commentId)
      if (!targetComment) return

      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: targetComment.likes + 1 }),
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
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <UserDetailDialogOpenButton post={post} />
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
                <PostDetailDialogOpenButton onClick={() => openPostDetail(post)} />
                <PostEditDialogOpenButton
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                />
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  // 댓글 렌더링
  const generateCommentSection = (postId: PostId) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <CommentAddDialogOpenButton
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId, comments)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <CommentEditDialogOpenButton
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              />
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
    <QueryProvider>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <PostAddDialogOpenButton onClick={() => setShowAddDialog(true)} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 검색 및 필터 컨트롤 */}
            <div className="flex gap-4">
              <PostsSearch />
              <PostsTagFilter />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">없음</SelectItem>
                  <SelectItem value="id">ID</SelectItem>
                  <SelectItem value="title">제목</SelectItem>
                  <SelectItem value="reactions">반응</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="정렬 순서" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">오름차순</SelectItem>
                  <SelectItem value="desc">내림차순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 게시물 테이블 */}
            {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

            {/* 페이지네이션 */}
            <Pagination
              limit={limit.toString()}
              onChangeLimit={(value: string) => setLimit(Number(value))}
              disablePrev={skip === 0}
              disableNext={skip + limit >= total}
              onClickPrev={() => setSkip(Math.max(0, skip - limit))}
              onClickNext={() => setSkip(skip + limit)}
            />
          </div>
        </CardContent>

        {/* 게시물 추가 대화상자 */}
        <PostAddDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          newPost={newPost}
          onChangeTitle={(e) => setNewPost({ ...newPost, title: e.target.value })}
          onChangeBody={(e) => setNewPost({ ...newPost, body: e.target.value })}
          onChangeUserId={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          onClickPostAddButton={addPost}
        />

        {/* 게시물 수정 대화상자 */}
        <PostEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          selectedPost={selectedPost}
          onChangeTitle={(e) => setSelectedPost((prev) => (prev ? { ...prev, title: e.target.value } : null))}
          onChangeBody={(e) => setSelectedPost((prev) => (prev ? { ...prev, body: e.target.value } : null))}
          onClickPostEditButton={updatePost}
        />

        {/* 댓글 추가 대화상자 */}
        <CommentAddDialog
          open={showAddCommentDialog}
          onOpenChange={setShowAddCommentDialog}
          newComment={newComment}
          onChangeBody={(e) => setNewComment({ ...newComment, body: e.target.value })}
          onClickCommentAddButton={addComment}
        />

        {/* 댓글 수정 대화상자 */}
        <CommentEditDialog
          open={showEditCommentDialog}
          onOpenChange={setShowEditCommentDialog}
          selectedComment={selectedComment}
          onChangeBody={(e) => setSelectedComment((prev) => (prev ? { ...prev, body: e.target.value } : null))}
          onClickCommentEditButton={updateComment}
        />

        {/* 게시물 상세 보기 대화상자 */}
        <PostDetailDialog
          open={showPostDetailDialog}
          onOpenChange={setShowPostDetailDialog}
          selectedPost={selectedPost}
          searchQuery={searchQuery}
          generateCommentSection={generateCommentSection}
        />

        {/* 사용자 모달 */}
        <UserDetailDialog />
      </Card>
    </QueryProvider>
  )
}

export default PostsManagerPage
