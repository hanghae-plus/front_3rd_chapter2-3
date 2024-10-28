import { CommentResponse } from "@/entities/comment/model/types";
import CommentDeleteButton from "@/features/comment-delete/ui/CommentDeleteButton";
import CommentLikeButton from "@/features/comment-like/ui/CommentLikeButton";

import { SelectedCommentProvider } from "@/features/post-comment/model/SelectedCommentContext";
import { SelectedPostProvider } from "@/features/post/model/SelectedPostContext";
import { SelectedUserProvider } from "@/features/user/model/SelectedUserContext";
import { useNavigator } from "@/shared/lib/useNavigator";
import { highlightText } from "@/shared/lib/utils";
import { useCommentContext } from "@/shared/model/CommnentContext";
import { Card } from "@/shared/ui";
import { ModalAddComment } from "@/widgets/comment/ui/ModalAddComment";
import ModalEditComment from "@/widgets/comment/ui/ModalEditComment";
import ModalAddPost from "@/widgets/post/ui/ModalAddPost";
import ProductSearchFilter from "@/widgets/post/ui/ProductSearchFilter";
import TablePosts from "@/widgets/post/ui/TablePosts";

export type NewComment = {
  body: string;
  postId: number | null;
  userId: number;
};

export type NewPost = {
  title: string;
  body: string;
  userId: number;
};

const PostsManager = () => {
  const { queries } = useNavigator();
  const { search } = queries;

  // comments
  const { comments, handleSetComments } = useCommentContext();

  //! 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = (await response.json()) as CommentResponse;
      handleSetComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        {/* 댓글 추가 대화상자 */}
        <ModalAddComment setComments={handleSetComments} postId={postId} />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, search)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CommentLikeButton comment={comment} postId={postId} />
              {/* 댓글 수정 대화상자 */}
              <ModalEditComment setComments={handleSetComments} comment={comment} />
              <CommentDeleteButton comment={comment} postId={postId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <SelectedPostProvider>
      <SelectedCommentProvider>
        <SelectedUserProvider>
          <Card.Container className="w-full max-w-6xl mx-auto">
            <Card.Header>
              <Card.Title className="flex items-center justify-between">
                <span>게시물 관리자</span>
                {/* 게시물 추가 대화상자 */}
                <ModalAddPost />
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="flex flex-col gap-4">
                {/* 검색 및 필터 컨트롤 */}
                <ProductSearchFilter />
                {/* 게시물 테이블 */}
                <TablePosts fetchComments={fetchComments} renderComments={renderComments} />
              </div>
            </Card.Content>
          </Card.Container>
        </SelectedUserProvider>
      </SelectedCommentProvider>
    </SelectedPostProvider>
  );
};

export default PostsManager;
