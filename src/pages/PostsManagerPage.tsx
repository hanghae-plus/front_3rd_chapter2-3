import { Card, CardContent } from "../shared/ui";
import { UserModal } from "../feature/user/ui";
import {
  PostAddDialog,
  PostDetailDialog,
  PostEditDialog,
  PostHeader,
  PostPagination,
  PostSearchBar,
} from "../feature/post/ui";
import { CommentAddDialog, CommentEditDialog } from "../feature/comment/ui";
import { PostTableWidget } from "../widgets/post/ui";

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchBar />

          {/*/!* 게시물 테이블 *!/*/}
          <PostTableWidget />

          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserModal />
    </Card>
  );
};

export default PostsManager;
