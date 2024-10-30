import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import SearchWidget from "../widgets/post/SearchWidget"
import TagSelectWidget from "../widgets/post/TagSelectWidget"
import SortBySelectWidget from "../widgets/post/SortBySelectWidget"
import SortOrderSelectWidget from "../widgets/post/SortOrderSelectWidget"
import PostTableWidget from "../widgets/post/PostTableWidget"
import PaginationWidget from "../widgets/post/PaginationWidget"
import AddPostDialog from "../widgets/post/AddPostDialog"
import { EditPostDialog } from "../widgets/post/EditPostDialog"
import { AddCommentDialog } from "../widgets/comment/ui/AddCommentDialog"
import { EditCommentDialog } from "../widgets/comment/ui/EditCommentDialog"
import PostDetailDialog from "../widgets/post/PostDetailDialog"
import { UserDialog } from "../widgets/user/ui/UserDialog"
import { useQueryParams } from "../features/post/model/useQueryParams"
import { usePostDialog } from "../features/post/model/usePostDialog"
import { PostType } from "../entities/Post/model/types"

const PostsManager = () => {
  // 상태 관리
  const [posts, setPosts] = useState<PostType[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [comments, setComments] = useState({})

  const { skip, limit, sortBy, sortOrder, updateURL, selectedTag } = useQueryParams()

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

  // 게시물 테이블 렌더링

  // 댓글 렌더링

  const Header: React.FC = () => {
    const { setShowAddDialog } = usePostDialog()

    return (
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
    )
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Header />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchWidget />
            <TagSelectWidget fetchPostsByTag={fetchPostsByTag} tagList={tags} />
            <SortBySelectWidget />
            <SortOrderSelectWidget />
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTableWidget postList={posts} />}
          {/* 페이지네이션 */}
          <PaginationWidget total={total} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog setPostList={setPosts} />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog comments={comments} />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  )
}

export default PostsManager
