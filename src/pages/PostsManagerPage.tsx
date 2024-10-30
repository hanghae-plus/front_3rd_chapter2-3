import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../shared/ui/button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/dialog/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select/Select"
import { Input, Textarea } from "../shared/ui/input/Text"
import { postFetch } from "../feature/post/model/postFetch"
import { postFetchTags } from "../entities/model/postFetchTags"
import { highlightText } from "../shared/utils/highlightText"
import { useAtom } from "jotai"

import {
  showAddDialogAtom,
  showEditDialogAtom,
  postsAtom,
  newPostAtom,
  showPostDetailDialogAtom,
  selectedPostAtom,
  searchQueryAtom,
  selectedTagAtom,
  showUserModalAtom,
  totalAtom,
  skipAtom,
  limitAtom,
  sortByAtom,
  sortOrderAtom,
  tagsAtom,
} from "../feature/post/model/postAtoms"

import {
  commentsAtom,
  selectedCommentAtom,
  newCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "../feature/comment/model/commentAtom"

import { User } from "../entities/ui/User"
import { RenderPostTable } from "../feature/post/ui/RenderPostTable"
import { CommentRender } from "../feature/comment/ui/CommentRender"
import { usePostHandler } from "../feature/post/model/postHandler"
import { SearchPost } from "../feature/post/ui/Search"
import { SearchAndFilter } from "../feature/post/ui/SearchAndFilter"
import { useUpdateURL } from "../shared/model/urlUtils"

const PostsManager = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [loading, setLoading] = useState(false)

  // jotai
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [, setPosts] = useAtom(postsAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [total, setTotal] = useAtom(totalAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)

  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [tags, setTags] = useAtom(tagsAtom)

  const { handleAddPost, handleUpdatePost } = usePostHandler()

  // URL 업데이트 함수
  const updateURL = useUpdateURL()

  // 게시물 검색
  const searchPosts = async () => {
    setLoading(true)

    try {
      let posts, total

      if (!searchQuery) {
        // 검색어가 없는 경우
        const result = await postFetch({ limit, skip })
        posts = result.posts
        total = result.total
      } else {
        // 검색어가 있는 경우
        const response = await fetch(`/api/posts/search?q=${searchQuery}`)
        const data = await response.json()
        posts = data.posts
        total = data.total
      }

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      setLoading(true)
      postFetch({ limit, skip })

      setLoading(false)
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

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
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

  useEffect(() => {
    const fetchData = async () => {
      const tags = await postFetchTags()
      setTags(tags)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      if (selectedTag) {
        await fetchPostsByTag(selectedTag)
      } else {
        const { posts, total, error } = await postFetch({ limit, skip })

        if (!error) {
          console.log("posts > > >", posts)
          setPosts(posts)
          setTotal(total)
        } else {
          console.error("게시물 가져오기 오류:", error)
        }
      }

      setLoading(false)
    }

    fetchData()
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

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
          {/* 검색 및 필터 컨트롤 */}
          <SearchAndFilter />

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <RenderPostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
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
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
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

            <Button onClick={() => handleAddPost()}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => setSelectedPost((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => setSelectedPost((prev) => ({ ...prev, body: e.target.value }))}
            />
            <Button onClick={() => handleUpdatePost(selectedPost)}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            {<CommentRender postId={selectedPost?.id} />}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <User showUserModal={showUserModal} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager
