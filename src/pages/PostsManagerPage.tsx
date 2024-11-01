import { Suspense } from "react";
import { Card, CardContent } from "../shared/ui";
import { DetailPostDialog, PostsTable } from "../widgets/post";
import Pagination from "../features/post/ui/Pagination";
import { SearchBar } from "../widgets/search";
import PostHeader from "../features/post/ui/PostHeader";
import AddPostDialog from "../features/post/ui/AddPostDialog";
import { EditPostDialog } from "../features/post/ui";
import { AddCommentDialog, EditCommentDialog } from "../features/comment/ui";
import { UserDetailDialog } from "../widgets/user/UserDetailDialog";

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchBar />
          {/* 게시물 테이블 */}
          <Suspense fallback={<div className="flex justify-center p-4">로딩 중...</div>}>
            <PostsTable />
          </Suspense>

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      <AddPostDialog />
      <EditPostDialog />
      <DetailPostDialog />
      <AddCommentDialog />
      <EditCommentDialog />
      <UserDetailDialog />
    </Card>
  );
};

export default PostsManager;
