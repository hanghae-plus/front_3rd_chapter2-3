import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui";

import { UserDialog } from "../../entities/user/ui/user-dialog";
import { CommentAddDialog } from "../../features/comment/ui/comment-add-dialog";
import { CommentEditDialog } from "../../features/comment/ui/comment-edit-dialog";
import { PostAddButton } from "../../features/post/ui/post-add-button";
import { PostAddDialog } from "../../features/post/ui/post-add-dialog";
import { PostEditDialog } from "../../features/post/ui/post-edit-dialog";
import { PostPagination } from "../../features/post/ui/post-pagination";
import { PostTable, SearchFilterBox } from "../../widgets/post";
import { PostDetailDialog } from "../../widgets/post/ui/post-detail-dialog";

export const PostListManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchFilterBox />
          {/* 게시물 테이블 */}
          <PostTable />
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
      <UserDialog />
    </Card>
  );
};
