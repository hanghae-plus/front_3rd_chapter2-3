import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../shared/ui/card"
import { useAtom } from "jotai"
import { skipAtom, limitAtom, searchQueryAtom, sortByAtom, sortOrderAtom, selectedTagAtom } from "../app/atom"
import useFetchPosts from "../features/useFetchPosts"
import useFetchPostsByTag from "../features/useFetchPostsByTag"
import Pagination from "../features/ui/Pagenation"
import SearchAndFilterControls from "../features/ui/SearchAndFilterControls"
import PostTable from "../features/ui/PostTable"
import Comments from "../features/ui/Comments"
import AddPost from "../features/ui/AddPost"
import AddPostDialog from "../features/ui/AddPostDialog"
import EditPostDialog from "../features/ui/EditPostDialog"
import AddCommentDialog from "../features/ui/AddCommentDialog"
import EditCommentDialog from "../features/ui/EditCommentDialog"
import PostDetailDialog from "../features/ui/PostDetailDialog"
import UserModal from "../features/ui/UserModal"

const PostsManager = () => {
  // 상태 관리
  const [skip] = useAtom(skipAtom)
  const [limit] = useAtom(limitAtom)
  const [searchQuery] = useAtom(searchQueryAtom)
  const [sortBy] = useAtom(sortByAtom)
  const [sortOrder] = useAtom(sortOrderAtom)
  const [selectedTag] = useAtom(selectedTagAtom)

  const { fetchPosts, loading } = useFetchPosts()
  const { fetchPostsByTag } = useFetchPostsByTag()

  const navigate = useNavigate()

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [])

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

  // 게시물 테이블 렌더링
  const renderPostTable = () => <PostTable updateURL={updateURL} />

  // 댓글 렌더링
  const renderComments = (postId: number) => <Comments postId={postId} />

  return (
    <Card className="w-full max-w-6xl mx-auto">
      {/* 게시물 추가 */}
      <AddPost />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchAndFilterControls updateURL={updateURL} />

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog renderComments={renderComments} />

      {/* 사용자 모달 */}
      <UserModal />
    </Card>
  )
}

export default PostsManager
