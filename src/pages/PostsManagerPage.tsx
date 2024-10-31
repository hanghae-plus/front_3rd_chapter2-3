import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostSearch } from "../features/post/ui/PostSearch"
import { ContentSearch } from "../widgets/ui/ContentSearch"
import { ContentControls } from "../widgets/ui/ContentControls"
import { Contents } from "../widgets/ui/Contents"
import { ContentFilter } from "../widgets/ui/ContentFilter"
import { PostFilter } from "../features/post/ui/PostFilter"
import { PostTable } from "../entities/post/ui/PostTable"
import { PostAddDialog } from "../features/post/ui/PostAddDialog"
import { PostUpdateDialog } from "../features/post/ui/PostUpdateDialog"
import { CommentAddDialog } from "../features/comment/ui/CommentAddDialog"
import { CommentUpdateDialog } from "../features/comment/ui/CommentUpdateDialog"
import { PostDetailDialog } from "../entities/post/ui/PostDetailDialog"
import { UserDetailDialog } from "../entities/user/ui/UserDetailDialog"
import { PostPagination } from "../features/post/ui/PostPagination"
import { PostTitle } from "../features/post/ui/PostTitle"

const PostsManager = () => {
  

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <PostTitle />
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
      <CommentUpdateDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
