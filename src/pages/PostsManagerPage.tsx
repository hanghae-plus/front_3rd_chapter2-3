import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../shared/ui/button/ui/Button"
import { Input } from "../shared/ui/input/ui/Input.tsx"
import { Textarea } from "../shared/ui/textarea/ui/Textarea.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shared/ui/table/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/dialog/ui"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card/ui"
import PostTagsItem from "../entities/post/ui/PostTagsItem.tsx"
import PostReactionsItem from "../entities/post/ui/PostReactionsItem.tsx"
import PostTable from "../widgets/post/ui/PostTable.tsx"
import { Post } from "../entities/post/model/types.ts"
import { usePostsStore } from "../features/post/model/usePostsStore.ts"
import { highlightText } from "../shared/lib/highlightText.tsx"
import { useQueryPostsAndUsers } from "../features/post/api/useQueryPostsAndUsers.ts"
import usePostQueryParams from "../features/post/model/usePostURLParams.ts"

const PostsManager = () => {
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag, setParam } = usePostQueryParams()
  const { total, isLoading } = usePostsStore((state) => state)
  useQueryPostsAndUsers(limit, skip, selectedTag)

  // 게시글 상태
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  // 기타 상태
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  // const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  const [comments, setComments] = useState<Record<string, any>>({})
  // const [selectedComment, setSelectedComment] = useState<any>(null)
  // const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })
  //
  // const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  // const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  // const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  // const [showUserModal, setShowUserModal] = useState(false)
  // const [selectedUser, setSelectedUser] = useState<any>(null)

  // // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // // 게시물 검색
  // const searchPosts = async () => {
  //   if (!searchQuery) {
  //     refetch()
  //     return
  //   }
  //   setIsLoading(true)
  //   try {
  //     const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  //     const data = await response.json()
  //     setPosts(data.posts)
  //     setTotal(data.total)
  //   } catch (error) {
  //     console.error("게시물 검색 오류:", error)
  //   }
  //   setIsLoading(false)
  // }
  //
  // // 게시물 추가
  // const addPost = async () => {
  //   try {
  //     const response = await fetch("/api/posts/add", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newPost),
  //     })
  //     const data = await response.json()
  //     setPosts([data, ...posts])
  //     setShowAddDialog(false)
  //     setNewPost({ title: "", body: "", userId: 1 })
  //   } catch (error) {
  //     console.error("게시물 추가 오류:", error)
  //   }
  // }
  //
  // // 게시물 업데이트
  // const updatePost = async () => {
  //   try {
  //     const response = await fetch(`/api/posts/${selectedPost.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(selectedPost),
  //     })
  //     const data = await response.json()
  //     setPosts(posts.map((post) => (post.id === data.id ? data : post)))
  //     setShowEditDialog(false)
  //   } catch (error) {
  //     console.error("게시물 업데이트 오류:", error)
  //   }
  // }
  //
  // // 게시물 삭제
  // const deletePost = async (id) => {
  //   try {
  //     await fetch(`/api/posts/${id}`, {
  //       method: "DELETE",
  //     })
  //     setPosts(posts.filter((post) => post.id !== id))
  //   } catch (error) {
  //     console.error("게시물 삭제 오류:", error)
  //   }
  // }
  //
  // // 댓글 가져오기
  // const fetchComments = async (postId) => {
  //   if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  //   try {
  //     const response = await fetch(`/api/comments/post/${postId}`)
  //     const data = await response.json()
  //     setComments((prev) => ({ ...prev, [postId]: data.comments }))
  //   } catch (error) {
  //     console.error("댓글 가져오기 오류:", error)
  //   }
  // }
  //
  // // 댓글 추가
  // const addComment = async () => {
  //   try {
  //     const response = await fetch("/api/comments/add", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newComment),
  //     })
  //     const data = await response.json()
  //     setComments((prev) => ({
  //       ...prev,
  //       [data.postId]: [...(prev[data.postId] || []), data],
  //     }))
  //     setShowAddCommentDialog(false)
  //     setNewComment({ body: "", postId: null, userId: 1 })
  //   } catch (error) {
  //     console.error("댓글 추가 오류:", error)
  //   }
  // }
  //
  // // 댓글 업데이트
  // const updateComment = async () => {
  //   try {
  //     const response = await fetch(`/api/comments/${selectedComment.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ body: selectedComment.body }),
  //     })
  //     const data = await response.json()
  //     setComments((prev) => ({
  //       ...prev,
  //       [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
  //     }))
  //     setShowEditCommentDialog(false)
  //   } catch (error) {
  //     console.error("댓글 업데이트 오류:", error)
  //   }
  // }
  //
  // // 댓글 삭제
  // const deleteComment = async (id, postId) => {
  //   try {
  //     await fetch(`/api/comments/${id}`, {
  //       method: "DELETE",
  //     })
  //     setComments((prev) => ({
  //       ...prev,
  //       [postId]: prev[postId].filter((comment) => comment.id !== id),
  //     }))
  //   } catch (error) {
  //     console.error("댓글 삭제 오류:", error)
  //   }
  // }
  //
  // // 댓글 좋아요
  // const likeComment = async (id, postId) => {
  //   try {
  //     const response = await fetch(`/api/comments/${id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
  //     })
  //     const data = await response.json()
  //     setComments((prev) => ({
  //       ...prev,
  //       [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
  //     }))
  //   } catch (error) {
  //     console.error("댓글 좋아요 오류:", error)
  //   }
  // }

  // // 게시물 상세 보기
  // const openPostDetail = (post) => {
  //   setSelectedPost(post)
  //   fetchComments(post.id)
  //   setShowPostDetailDialog(true)
  // }
  //
  // // 사용자 모달 열기
  // const openUserModal = async (user) => {
  //   try {
  //     const response = await fetch(`/api/users/${user.id}`)
  //     const userData = await response.json()
  //     setSelectedUser(userData)
  //     setShowUserModal(true)
  //   } catch (error) {
  //     console.error("사용자 정보 가져오기 오류:", error)
  //   }
  // }

  useEffect(() => {
    fetchTags()
  }, [])

  // useEffect(() => {
  //   if (selectedTag) {
  //     tagRefatch()
  //     // fetchPostsByTag(selectedTag)
  //   }
  //   // updateURL()
  // }, [skip, limit, sortBy, sortOrder, selectedTag])

  // 게시물 테이블 렌더링
  // const renderPostTable = () => (
  //   <Table>
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead className="w-[50px]">ID</TableHead>
  //         <TableHead>제목</TableHead>
  //         <TableHead className="w-[150px]">작성자</TableHead>
  //         <TableHead className="w-[150px]">반응</TableHead>
  //         <TableHead className="w-[150px]">작업</TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {posts.map((post) => (
  //         <TableRow key={post.id}>
  //           <TableCell>{post.id}</TableCell>
  //           <TableCell>
  //             <div className="space-y-1">
  //               <div>{highlightText(post.title, searchQuery)}</div>
  //
  //               <div className="flex flex-wrap gap-1">
  //                 <PostTagsItem tags={post.tags} onTagClick={(tag) => setParam("tag", tag)} selectedTag={selectedTag} />
  //               </div>
  //             </div>
  //           </TableCell>
  //           <TableCell>
  //             <PostAuthorUser author={post.author} onClick={() => openUserModal(post.author)} />
  //           </TableCell>
  //           <TableCell>
  //             <PostReactionsItem reactions={post.reactions} />
  //           </TableCell>
  //           <TableCell>
  //             <div className="flex items-center gap-2">
  //               <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
  //                 <MessageSquare className="w-4 h-4" />
  //               </Button>
  //               <Button
  //                 variant="ghost"
  //                 size="sm"
  //                 onClick={() => {
  //                   setSelectedPost(post)
  //                   setShowEditDialog(true)
  //                 }}
  //               >
  //                 <Edit2 className="w-4 h-4" />
  //               </Button>
  //               <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
  //                 <Trash2 className="w-4 h-4" />
  //               </Button>
  //             </div>
  //           </TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // )

  // 댓글 렌더링
  const renderComments = (postId) => (
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
        <div className="flex flex-col gap-4">
          {/*  /!* 검색 및 필터 컨트롤 *!/*/}
          {/*  <div className="flex gap-4">*/}
          {/*    <div className="flex-1">*/}
          {/*      <div className="relative">*/}
          {/*        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />*/}
          {/*        <Input*/}
          {/*          placeholder="게시물 검색..."*/}
          {/*          className="pl-8"*/}
          {/*          value={searchQuery}*/}
          {/*          onChange={(e) => setParam("search", e.target.value)}*/}
          {/*          onKeyPress={(e) => e.key === "Enter" && searchPosts()}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <Select value={selectedTag} onValueChange={(value) => setParam("tag", value)}>*/}
          {/*      <SelectTrigger className="w-[180px]">*/}
          {/*        <SelectValue placeholder="태그 선택" />*/}
          {/*      </SelectTrigger>*/}
          {/*      <SelectContent>*/}
          {/*        <SelectItem value="all">모든 태그</SelectItem>*/}
          {/*        {tags.map((tag) => (*/}
          {/*          <SelectItem key={tag.url} value={tag.slug}>*/}
          {/*            {tag.slug}*/}
          {/*          </SelectItem>*/}
          {/*        ))}*/}
          {/*      </SelectContent>*/}
          {/*    </Select>*/}
          {/*    <Select value={sortBy} onValueChange={(value) => setParam("sortBy", value)}>*/}
          {/*      <SelectTrigger className="w-[180px]">*/}
          {/*        <SelectValue placeholder="정렬 기준" />*/}
          {/*      </SelectTrigger>*/}
          {/*      <SelectContent>*/}
          {/*        <SelectItem value="none">없음</SelectItem>*/}
          {/*        <SelectItem value="id">ID</SelectItem>*/}
          {/*        <SelectItem value="title">제목</SelectItem>*/}
          {/*        <SelectItem value="reactions">반응</SelectItem>*/}
          {/*      </SelectContent>*/}
          {/*    </Select>*/}
          {/*    <Select value={sortOrder} onValueChange={(value) => setParam("sortOrder", value)}>*/}
          {/*      <SelectTrigger className="w-[180px]">*/}
          {/*        <SelectValue placeholder="정렬 순서" />*/}
          {/*      </SelectTrigger>*/}
          {/*      <SelectContent>*/}
          {/*        <SelectItem value="asc">오름차순</SelectItem>*/}
          {/*        <SelectItem value="desc">내림차순</SelectItem>*/}
          {/*      </SelectContent>*/}
          {/*    </Select>*/}
          {/*  </div>*/}

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setParam("limit", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setParam("skip", Math.max(0, skip - limit).toString())}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setParam("skip", (skip + limit).toString())}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      {/*<Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>새 게시물 추가</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Input*/}
      {/*        placeholder="제목"*/}
      {/*        value={newPost.title}*/}
      {/*        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}*/}
      {/*      />*/}
      {/*      <Textarea*/}
      {/*        rows={30}*/}
      {/*        placeholder="내용"*/}
      {/*        value={newPost.body}*/}
      {/*        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Input*/}
      {/*        type="number"*/}
      {/*        placeholder="사용자 ID"*/}
      {/*        value={newPost.userId}*/}
      {/*        onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}*/}
      {/*      />*/}
      {/*      <Button onClick={addPost}>게시물 추가</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/* 게시물 수정 대화상자 */}
      {/*<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>게시물 수정</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Input*/}
      {/*        placeholder="제목"*/}
      {/*        value={selectedPost?.title || ""}*/}
      {/*        onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}*/}
      {/*      />*/}
      {/*      <Textarea*/}
      {/*        rows={15}*/}
      {/*        placeholder="내용"*/}
      {/*        value={selectedPost?.body || ""}*/}
      {/*        onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Button onClick={updatePost}>게시물 업데이트</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 댓글 추가 대화상자 *!/*/}
      {/*<Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>새 댓글 추가</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Textarea*/}
      {/*        placeholder="댓글 내용"*/}
      {/*        value={newComment.body}*/}
      {/*        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Button onClick={addComment}>댓글 추가</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 댓글 수정 대화상자 *!/*/}
      {/*<Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>댓글 수정</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Textarea*/}
      {/*        placeholder="댓글 내용"*/}
      {/*        value={selectedComment?.body || ""}*/}
      {/*        onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Button onClick={updateComment}>댓글 업데이트</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 게시물 상세 보기 대화상자 *!/*/}
      {/*<Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>*/}
      {/*  <DialogContent className="max-w-3xl">*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <p>{highlightText(selectedPost?.body, searchQuery)}</p>*/}
      {/*      {renderComments(selectedPost?.id)}*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 사용자 모달 *!/*/}
      {/*<Dialog open={showUserModal} onOpenChange={setShowUserModal}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>사용자 정보</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />*/}
      {/*      <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>*/}
      {/*      <div className="space-y-2">*/}
      {/*        <p>*/}
      {/*          <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>나이:</strong> {selectedUser?.age}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>이메일:</strong> {selectedUser?.email}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>전화번호:</strong> {selectedUser?.phone}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}*/}
      {/*          {selectedUser?.address?.state}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}
    </Card>
  )
}

export default PostsManager
