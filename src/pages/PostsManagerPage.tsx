import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostSearch } from "../features/post/ui/PostSearch"
import { ContentSearch } from "../widgets/ui/ContentSearch"
import { ContentControls } from "../widgets/ui/ContentControls"
import { Contents } from "../widgets/ui/Contents"
import { ContentFilter } from "../widgets/ui/ContentFilter"
import { PostFilter } from "../features/post/ui/PostFilter"
import { PostTable } from "../entities/post/ui/PostTable"
import { PostAddDialog } from "../features/post/ui/PostAddDialog"
import { PostUpdateDialog } from "../features/post/ui/PostUpdateDialog"
import { Comment } from "../entities/comment/model/types"
import { CommentAddDialog } from "../features/comment/ui/CommentAddDialog"
import { CommentUpdateDialog } from "../features/comment/ui/CommentUpdateDialog"
import { PostDetailDialog } from "../entities/post/ui/PostDetailDialog"
import { UserDetailDialog } from "../entities/user/ui/UserDetailDialog"
import { useDialog } from "../features/post/model/dialogStore"
import { PostPagination } from "../features/post/ui/PostPagination"

const PostsManager = () => {
  const { setShowPostAddDialog } = useDialog()

  // 상태 관리
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // 게시물 추가 모달 열기
  const handlePostAddDialogOpen = () => {
    setShowPostAddDialog(true)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handlePostAddDialogOpen}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Contents>
          {/* 검색 및 필터 컨트롤 */}
          <ContentControls>
            <ContentSearch>
              <PostSearch />
            </ContentSearch>
            <ContentFilter>
              <PostFilter />
            </ContentFilter>
          </ContentControls>

          {/* 게시물 테이블 */}
          <PostTable />

          {/* 페이지네이션 */}
          <PostPagination />
        </Contents>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostUpdateDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      {selectedComment && <CommentUpdateDialog selectedComment={selectedComment} />}

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog setSelectedComment={setSelectedComment} />

      {/* 사용자 모달 */}
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
