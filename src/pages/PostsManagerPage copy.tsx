import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, Table, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/ui"
import PostTable from "../features/posts/components/PostTable"

const PostsManager = () => {
  const location = useLocation()

  // 상태 관리

  // 태그 가져오기

  // 게시물 검색

  // 태그별 게시물 가져오기

  // 게시물 추가

  // 사용자 모달 열기
  const openUserModal = async (user: Users) => {
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
        {posts?.posts?.map((post) => (
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
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  if (post?.author) {
                    openUserModal(post.author)
                  }
                }}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  // 댓글 렌더링
  const renderComments = (postId: number = 0) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            if (postId) {
              setNewComment((prev) => ({ ...prev, postId }))
              setShowAddCommentDialog(true)
            }
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
          {/* 게시물 추가 버튼 */}
          {/* <PostAddButton setShowAddDialog={setShowAddDialog}> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                {/* 게시물 검색 버튼 */}
                {/* <PostSearchInput  searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPosts={searchPosts}/> */}
              </div>
            </div>

            {/* 게시물 검색의 태그 선택 */}

            {/* <PostSearchTagSelect selectedTag={selectedTag} setSelectedTag={setSelectedTag} tags={tags} fetchPostsByTag={fetchPostsByTag} updateURL={updateURL}/>*/}

            {/*게시물 검색의 정렬 선택   */}
            {/* <PostSearchSortSelect sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder}/>  */}
          </div>

          {/* 게시물 테이블 renderPostTable()은 사용되는 컴포넌트에서 useEffect안에 추가 예정*/}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              {/* <PostPaginationSelectLimit limit={limit} setLimit={setLimit} > */}
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              {/* <PostPaginationButton skip={skip} limit={limit} total={total} setSkip={setSkip} /> */}
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      {/* <PostAddDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} newPost={newPost} setNewPost={setNewPost} addPost={addPost}/> */}

      {/* 게시물 수정 대화상자 */}
      {/* <PostEditDialog showEditCommentDialog={showEditCommentDialog} setShowEditCommentDialog={setShowEditCommentDialog} selectedComment={selectedComment} setSelectedComment={setSelectedComment} updateComment={updateComment}/> */}

      {/* 댓글 추가 대화상자 */}
      {/* <CommentsAddDialog showAddCommentDialog={showAddCommentDialog} setShowAddCommentDialog={setShowAddCommentDialog} newComment={newComment} setNewComment={setNewComment} addComment={addComment}/ > */}

      {/* 댓글 수정 대화상자 */}
      {/* <CommentsEditDialog showEditCommentDialog={showEditCommentDialog} setShowEditCommentDialog={setShowEditCommentDialog} selectedComment={selectedComment} setSelectedComment={setSelectedComment} updateComment={updateComment}/> */}

      {/* 게시물 상세 보기 대화상자 */}
      {/* <PostDetailDialog   showPostDetailDialog={showPostDetailDialog}
  setShowPostDetailDialog={setShowPostDetailDialog}
  selectedPost={selectedPost}
  searchQuery={searchQuery} /> */}

      {/* 사용자 모달 */}
      {/* UserModal */}
      {/* -- entities에 userModal로 넣을 예정 <UserModal showUserModal={showUserModal}, setShowUserModal={setShowUserModal}, selectedUser={selectedUser}> */}
    </Card>
  )
}

export default PostsManager
