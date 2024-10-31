import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../shared/ui/card"
import { useAtom } from "jotai"
import { skipAtom, limitAtom, searchQueryAtom, sortByAtom, sortOrderAtom, selectedTagAtom } from "../app/atom"
import Pagination from "../entities/ui/Pagenation"
import SearchAndFilterControls from "../features/ui/SearchAndFilterControls"
import PostTable from "../entities/ui/post/PostTable"
import Comments from "../features/ui/comment/CommentList"
import AddPost from "../features/ui/post/AddPost"
import AddPostDialog from "../features/ui/post/AddPostDialog"
import EditPostDialog from "../features/ui/post/EditPostDialog"
import AddCommentDialog from "../features/ui/comment/AddCommentDialog"
import EditCommentDialog from "../features/ui/comment/EditCommentDialog"
import PostDetailDialog from "../entities/ui/post/PostDetailDialog"
import UserModal from "../entities/ui/user/UserModal"
import { useGetPostsByTag } from "../entities/api/post/useGetPostsByTag"
import { useGetPosts } from "../entities/api/post/useGetPosts"

const PostsManager = () => {
  const navigate = useNavigate()
  // 상태 관리
  const [skip] = useAtom(skipAtom)
  const [limit] = useAtom(limitAtom)
  const [searchQuery] = useAtom(searchQueryAtom)
  const [sortBy] = useAtom(sortByAtom)
  const [sortOrder] = useAtom(sortOrderAtom)
  const [selectedTag] = useAtom(selectedTagAtom)

  const { data: getPosts, isLoading: postsLoading } = useGetPosts(limit, skip)
  const { data: getPostsByTag, isLoading: postsByTagLoading } = useGetPostsByTag()
  const isLoading = postsLoading || postsByTagLoading // 로딩 상태 통합

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

  useEffect(() => {
    updateURL() // URL 업데이트
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    // 로딩 상태를 확인하여 데이터를 가져옵니다.
    if (!isLoading) {
      if (selectedTag && getPostsByTag) {
        // selectedTag가 있을 때 postsByTag 사용
        console.log("태그에 따른 게시물:", getPostsByTag)
      } else if (getPosts) {
        // selectedTag가 없을 때 posts 사용
        console.log("게시물:", getPosts)
      }
    }
  }, [isLoading, selectedTag, getPostsByTag, getPosts])

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
          {postsLoading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

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
