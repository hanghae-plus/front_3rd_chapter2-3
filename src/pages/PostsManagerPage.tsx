import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

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
import { Post } from "../entities/post/model/types"
import { Comment } from "../entities/comment/model/types"
import useFetchPosts from "../features/post/api/useFetchPosts"
import useManageComments from "../features/comment/api/useFetchComments"
import useSelectedUserModal from "../features/user/api/useSelectedUserModal"
import UserModal from "../features/user/ui/UserModal"
import useSelectedPostModal from "../features/post/api/useSelectedPostModal"
import PostManagerHeader from "../features/post/ui/PostManagerHeader"
import { useFetchTags } from "../features/post/api/useFetchTags"
import AddPostDialog from "../features/post/ui/AddPostDialog"
import { usePostStore } from "../entities/post/model/postStore"
import useSyncQueryParams from "../features/post/api/useSyncQueryParams"

const PostsManager = () => {
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
  const { comments, fetchComments, createComment, updateComment, deleteComment, likeComment } = useManageComments()
  const { selectedUser, handleSetSelectedUser, showUserModal, handleCloseUserModal } = useSelectedUserModal()
  const { selectedPost, handleSetSelectedPost, showPostModal, handleClosePostModal } = useSelectedPostModal()
  const { tags } = useFetchTags()

  // 상태 관리
  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  } = usePostStore()
  useSyncQueryParams()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  // 게시물 가져오기
  const handleFetchPosts = () => {
    fetchPosts({ limit, skip })
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
  const addPost = async (post: Partial<Post>) => {
    try {
      const data = await postApi.createPost(post)
      appendLocalPost(data)
      setShowAddDialog(false)
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
  const handleFetchComments = async (postId: number) => {
    fetchComments(postId)
  }

  // 댓글 추가
  const addComment = async () => {
    if (!newComment.postId) return
    createComment(newComment as unknown as Partial<Comment>).then(() => {
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    })
  }

  // 댓글 업데이트
  const handleUpdateComment = async () => {
    if (!selectedComment) return
    updateComment(selectedComment.id, selectedComment.body).then(() => {
      setShowEditCommentDialog(false)
    })
  }

  // 댓글 삭제
  const handleDeleteComment = async (id: number, postId: number) => {
    deleteComment(id, postId)
  }

  // 댓글 좋아요
  const handleLikeComment = async (id: number, postId: number) => {
    likeComment(id, postId)
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    handleSetSelectedPost(post)
    handleFetchComments(post.id)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await userApi.fetchUser(user.id)
      handleSetSelectedUser(userData)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag)
    } else {
      handleFetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag])

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
                    handleSetSelectedPost(post)
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
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
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
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, postId)}>
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
      <PostManagerHeader openAddDialog={() => setShowAddDialog(true)} />
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
      {showAddDialog && (
        <AddPostDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} addPost={addPost} />
      )}

      {/* 게시물 수정 대화상자 */}
      {showEditDialog && (
        <Dialog.Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <Dialog.DialogContent>
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>게시물 수정</Dialog.DialogTitle>
            </Dialog.DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="제목"
                value={selectedPost?.title || ""}
                onChange={(e) => selectedPost && handleSetSelectedPost({ ...selectedPost, title: e.target.value })}
              />
              <Textarea
                rows={15}
                placeholder="내용"
                value={selectedPost?.body || ""}
                onChange={(e) => selectedPost && handleSetSelectedPost({ ...selectedPost, body: e.target.value })}
              />
              <Button onClick={updatePost}>게시물 업데이트</Button>
            </div>
          </Dialog.DialogContent>
        </Dialog.Dialog>
      )}

      {/* 댓글 추가 대화상자 */}
      {showAddCommentDialog && (
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
      )}

      {/* 댓글 수정 대화상자 */}
      {selectedComment && showEditCommentDialog && (
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
              <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
            </div>
          </Dialog.DialogContent>
        </Dialog.Dialog>
      )}

      {/* 게시물 상세 보기 대화상자 */}
      {selectedPost && showPostModal && (
        <Dialog.Dialog open={showPostModal} onOpenChange={handleClosePostModal}>
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
      )}

      {/* 사용자 모달 */}
      <UserModal
        selectedUser={selectedUser}
        showUserModal={showUserModal}
        handleCloseUserModal={handleCloseUserModal}
      />
    </Card.Card>
  )
}

export default PostsManager
