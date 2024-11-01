import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { usePost } from "../features/post/model/usePost.ts"
import { usePostDialog } from "../features/post/model/usePostDialog.ts"
import { useTag } from "../features/tag/model/useTag.ts"
import { CommentAddDialog } from "../modules/comment/ui/CommentAddDialog.tsx"
import { CommentEditDialog } from "../modules/comment/ui/CommentEditDialog.tsx"
import { CommentList } from "../modules/comment/ui/CommentList.tsx"
import { PostAddDialog } from "../modules/post/PostAddDialog.tsx"
import { PostEditDialog } from "../modules/post/PostEditDialog.tsx"
import { PostTable } from "../modules/post/PostTable.tsx"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui"
import { highlightText } from "../shared/ui/highlightText.tsx"
import { usePage } from "./model/usePage.ts"
import { UserDialog } from "../modules/user/ui/UserDialog.tsx"
import { useDialog } from "../features/dialog/model/useDialog.ts"

function Pagination(
  limit: number,
  setLimit: (value: ((prevState: number) => number) | number) => void,
  skip: number,
  setSkip: (value: ((prevState: number) => number) | number) => void,
  total: number,
) {
  return (
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
  )
}

const PostsManager = () => {
  const { showUserModal, setShowUserModal } = useDialog()

  console.log("showUserModalshowUserModal", showUserModal)

  // 상태 관리
  const { setPosts, selectedPost } = usePost()
  const { showPostDetailDialog, setShowPostDetailDialog, setShowAddDialog } = usePostDialog()
  const { tags, setTags, selectedTag } = useTag()

  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // pages/model/usePage.ts
  const { skip, setSkip, limit, setLimit, searchQuery, sortBy, sortOrder } = usePage()

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)

    let postsData
    let usersData

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
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

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
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

  useEffect(() => {
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
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <>
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
            {PostActionBar()}

            {/* 게시물 테이블 */}
            {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

            {/* 페이지네이션 */}
            {Pagination(limit, setLimit, skip, setSkip, total)}
          </div>
        </CardContent>

        {/* 게시물 상세 보기 대화상자 */}
        <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p>{highlightText(selectedPost?.body, searchQuery)}</p>
              <CommentList postId={selectedPost?.id} />
            </div>
          </DialogContent>
        </Dialog>
      </Card>

      {/* 사용자 모달 */}
      <UserDialog />

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      {<CommentEditDialog />}
    </>
  )

  function PostActionBar() {
    const { setSearchQuery, setSelectedTag, setSortBy, setSortOrder } = usePage()

    // 게시물 검색
    const searchPosts = async () => {
      if (!searchQuery) {
        fetchPosts()
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

    return (
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPosts()}
            />
          </div>
        </div>

        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 태그</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
    )
  }
}

export default PostsManager
