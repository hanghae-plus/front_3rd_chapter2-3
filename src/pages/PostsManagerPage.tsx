import { Suspense } from "react";
import { Card, CardContent } from "../shared/ui";
import { DetailPostDialog, PostsTable } from "../widgets/post";
import Pagination from "../features/post/ui/Pagination";
import { SearchBar } from "../widgets/search";
import PostHeader from "../features/post/ui/PostHeader";
import AddPostDialog from "../features/post/ui/AddPostDialog";
import { EditPostDialog } from "../features/post/ui";
import { AddCommentDialog, EditCommentDialog } from "../features/comment/ui";

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

      {/* 사용자 모달 */}
      {/* <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </Card>
  );
};

export default PostsManager;
