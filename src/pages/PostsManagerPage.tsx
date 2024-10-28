import { useState } from "react";
import { Plus } from "lucide-react";

import { Post } from "../temp/types.ts";

import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui";

import { UserModal } from "../feature/user/ui";
import {
  AddPostDialog,
  DetailPostDialog,
  EditPostDialog,
  PostPagination,
  PostSearchBar,
  PostTable,
} from "../feature/post/ui";
import { AddCommentDialog, EditCommentDialog } from "../feature/comment/ui";
import { usePostContext } from "../feature/post/model/PostContext.tsx";
import { useCommentContext } from "../feature/comment/model/CommentContext.tsx";

const PostsManager = () => {
  const { loading, setSelectedPost, setShowAddDialog } = usePostContext();

  const { fetchComments } = useCommentContext();

  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false);

  const openPostDetail = async (post: Post) => {
    setSelectedPost({ ...post });
    await fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return (
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
          <PostSearchBar />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable openPostDetail={openPostDetail} />
          )}

          {/* 페이지네이션 */}
          <PostPagination />
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
      <DetailPostDialog isOpen={showPostDetailDialog} onClose={() => setShowPostDetailDialog(false)} />

      {/* 사용자 모달 */}
      <UserModal />
    </Card>
  );
};

export default PostsManager;
