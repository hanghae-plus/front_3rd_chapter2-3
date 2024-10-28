import { SelectedCommentProvider } from "@/features/post-comment/model/SelectedCommentContext";
import CommentDeleteButton from "@/features/post-comment/ui/CommentDeleteButton";
import CommentLikeButton from "@/features/post-comment/ui/CommentLikeButton";
import { ModalAddComment } from "@/features/post-comment/ui/modals/ModalAddComment";
import ModalEditComment from "@/features/post-comment/ui/modals/ModalEditComment";
import { SelectedPostProvider } from "@/features/post/model/SelectedPostContext";
import ModalAddPost from "@/features/post/ui/modals/ModalAddPost";
import { SelectedUserProvider } from "@/features/user/model/SelectedUserContext";

import { useNavigator } from "@/shared/lib/useNavigator";
import { highlightText } from "@/shared/lib/utils";
import { useCommentContext } from "@/shared/model/CommnentContext";
import { Card } from "@/shared/ui";

import ProductSearchFilter from "@/widgets/post/ui/ProductSearchFilter";
import TablePosts from "@/widgets/post/ui/TablePosts";

const PostsManager = () => {
  const { queries } = useNavigator();
  const { search } = queries;

  // comments
  const { comments } = useCommentContext();

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        {/* 댓글 추가 대화상자 */}
        <ModalAddComment postId={postId} />
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
              <ModalEditComment comment={comment} />
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
                <TablePosts renderComments={renderComments} />
              </div>
            </Card.Content>
          </Card.Container>
        </SelectedUserProvider>
      </SelectedCommentProvider>
    </SelectedPostProvider>
  );
};

export default PostsManager;
