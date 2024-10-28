import { Comment, CommentResponse } from "@/entities/comment/model/types";

import { User } from "@/entities/user/model/types";
import { SelectedCommentProvider } from "@/features/comment/model/SelectedCommentContext";
import { SelectedPostProvider } from "@/features/post/model/SelectedPostContext";
import { SelectedUserProvider } from "@/features/user/model/SelectedUserContext";
import { useNavigator } from "@/shared/lib/useNavigator";
import { highlightText } from "@/shared/lib/utils";
import { Button, Card } from "@/shared/ui";
import { ModalAddComment } from "@/widgets/comment/ui/ModalAddComment";
import ModalEditComment from "@/widgets/comment/ui/ModalEditComment";
import ModalAddPost from "@/widgets/post/ui/ModalAddPost";
import ProductSearchFilter from "@/widgets/post/ui/ProductSearchFilter";
import TablePosts from "@/widgets/post/ui/TablePosts";
import { ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";

export type UsersResponse = {
  users: User[];
};

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

  // const { comments, loading } = useFetchComments({ postId: queries.id });

  // 상태 관리
  // filter

  // comments
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      // setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  //! 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = (await response.json()) as CommentResponse;
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);
    if (!comment) return;
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        {/* 댓글 추가 대화상자 */}
        <ModalAddComment setComments={setComments} postId={postId} />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, search)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              {/* 댓글 수정 대화상자 */}
              <ModalEditComment setComments={setComments} comment={comment} />
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
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
                <TablePosts fetchComments={fetchComments} renderComments={renderComments} deletePost={deletePost} />
              </div>
            </Card.Content>
          </Card.Container>
        </SelectedUserProvider>
      </SelectedCommentProvider>
    </SelectedPostProvider>
  );
};

export default PostsManager;
