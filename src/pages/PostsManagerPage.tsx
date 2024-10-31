import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import Card from "../shared/ui/Card"
import Button from "../shared/ui/Button"
import Input from "../shared/ui/Input"
import Textarea from "../shared/ui/TextArea"
import Select from "../shared/ui/Select"
import Dialog from "../shared/ui/Dialog"
import Table from "../shared/ui/Table"
import HighlightText from "../shared/ui/HighlightText"
import { postApi } from "../entities/post/api/postApi"
import { userApi } from "../entities/user/api/userApi"
import { User } from "../entities/user/model/types"
import { Post, Tag } from "../entities/post/model/types"
import { commentApi } from "../entities/comment/api/commentApi"
import { Comment } from "../entities/comment/model/types"
import useFetchPosts from "../features/post/api/useFetchPosts"

interface Comments {
  [key: number]: Comment[]
}

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const {
    posts,
    loading,
    fetchPosts,
    total,
    searchPosts,
    fetchPostsByTag,
    appendLocalPost,
    updateLocalPost,
    removeLocalPost,
  } = useFetchPosts()

  // 상태 관리
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [comments, setComments] = useState<Comments>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })
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
  const handleFetchPosts = () => {
    fetchPosts({ limit, skip })
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await postApi.fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const handleSearchPosts = async () => {
    if (!searchQuery) {
      handleFetchPosts()
      return
    }

    searchPosts({ q: searchQuery })
  }

  // 태그별 게시물 가져오기
  const handleFetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      handleFetchPosts()
      return
    }

    fetchPostsByTag({ tag })
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postApi.createPost(newPost)
      appendLocalPost(data)
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
      const data = await postApi.updatePost({ id: selectedPost.id, payload: selectedPost })
      updateLocalPost(data)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await postApi.deletePost(id)
      removeLocalPost(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await commentApi.fetchComments(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await commentApi.createComment(newComment)
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
      const data = await commentApi.updateComment({ id: selectedComment.id, payload: selectedComment.body })
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
  const deleteComment = async (id: number, postId: number) => {
    try {
      await commentApi.deleteComment(id)
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
      const data = await commentApi.likeComment({
        id,
        payload: { likes: comments[postId].find((c) => c.id === id).likes + 1 },
      })
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
  const openUserModal = async (user) => {
    try {
      const userData = await userApi.fetchUser(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag)
    } else {
      handleFetchPosts()
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

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table.Table>
      <Table.TableHeader>
        <Table.TableRow>
          <Table.TableHead className="w-[50px]">ID</Table.TableHead>
          <Table.TableHead>제목</Table.TableHead>
          <Table.TableHead className="w-[150px]">작성자</Table.TableHead>
          <Table.TableHead className="w-[150px]">반응</Table.TableHead>
          <Table.TableHead className="w-[150px]">작업</Table.TableHead>
        </Table.TableRow>
      </Table.TableHeader>
      <Table.TableBody>
        {posts.map((post) => (
          <Table.TableRow key={post.id}>
            <Table.TableCell>{post.id}</Table.TableCell>
            <Table.TableCell>
              <div className="space-y-1">
                <div>
                  <HighlightText text={post.title} highlight={searchQuery} />
                </div>

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
            </Table.TableCell>
            <Table.TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </Table.TableCell>
            <Table.TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </Table.TableCell>
            <Table.TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Table.TableCell>
          </Table.TableRow>
        ))}
      </Table.TableBody>
    </Table.Table>
  )

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
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
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
    <Card.Card className="w-full max-w-6xl mx-auto">
      <Card.CardHeader>
        <Card.CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchPosts()}
                />
              </div>
            </div>
            <Select.Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
                handleFetchPostsByTag(value)
                updateURL()
              }}
            >
              <Select.SelectTrigger className="w-[180px]">
                <Select.SelectValue placeholder="태그 선택" />
              </Select.SelectTrigger>
              <Select.SelectContent>
                <Select.SelectItem value="all">모든 태그</Select.SelectItem>
                {tags.map((tag) => (
                  <Select.SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </Select.SelectItem>
                ))}
              </Select.SelectContent>
            </Select.Select>
            <Select.Select value={sortBy} onValueChange={setSortBy}>
              <Select.SelectTrigger className="w-[180px]">
                <Select.SelectValue placeholder="정렬 기준" />
              </Select.SelectTrigger>
              <Select.SelectContent>
                <Select.SelectItem value="none">없음</Select.SelectItem>
                <Select.SelectItem value="id">ID</Select.SelectItem>
                <Select.SelectItem value="title">제목</Select.SelectItem>
                <Select.SelectItem value="reactions">반응</Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
            <Select.Select value={sortOrder} onValueChange={setSortOrder}>
              <Select.SelectTrigger className="w-[180px]">
                <Select.SelectValue placeholder="정렬 순서" />
              </Select.SelectTrigger>
              <Select.SelectContent>
                <Select.SelectItem value="asc">오름차순</Select.SelectItem>
                <Select.SelectItem value="desc">내림차순</Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select.Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <Select.SelectTrigger className="w-[180px]">
                  <Select.SelectValue placeholder="10" />
                </Select.SelectTrigger>
                <Select.SelectContent>
                  <Select.SelectItem value="10">10</Select.SelectItem>
                  <Select.SelectItem value="20">20</Select.SelectItem>
                  <Select.SelectItem value="30">30</Select.SelectItem>
                </Select.SelectContent>
              </Select.Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </Card.CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog.Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>새 게시물 추가</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={addPost}>게시물 추가</Button>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog.Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>게시물 수정</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog.Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>새 댓글 추가</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog.Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>댓글 수정</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog.Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <Dialog.DialogContent className="max-w-3xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>
              <HighlightText text={selectedPost?.title} highlight={searchQuery} />
            </Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="space-y-4">
            <p>
              <HighlightText text={selectedPost?.body} highlight={searchQuery} />
            </p>
            {renderComments(selectedPost?.id)}
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>

      {/* 사용자 모달 */}
      <Dialog.Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>사용자 정보</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </Card.Card>
  )
}

export default PostsManager
