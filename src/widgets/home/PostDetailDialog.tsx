import { FC } from 'react';
import HighlightText from '@/shared/ui/Highlight';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/Dialog';

import type { Post } from '@/entities/home/model/types';

import { usePostFilter } from '@/features/home/model/usePostFilter';
import { usePost } from '@/features/home/model/usePost';
import useComment from '@/features/home/model/useComment';
import PostCommentActions, { PostCoomentAddButton } from '@/features/home/ui/PostCommentActions';

const PostDetailDialogComment: FC<{ selectedPost: Post | null; search: string }> = ({ selectedPost, search }) => {
  const { comments } = useComment();

  if (!selectedPost) return <p className="text-sm text-gray-500">게시물이 없습니다.</p>;

  return (
    <section className="mt-2">
      <section className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>

        <PostCoomentAddButton selectedPost={selectedPost} />
      </section>

      <section className="space-y-1">
        {!comments || comments.length === 0 ? (
          <p className="text-sm text-gray-500">댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <section
              key={comment.id}
              className="flex items-center justify-between text-sm border-b pb-1"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment.user.username}:</span>
                <span className="truncate">
                  <HighlightText
                    text={comment.body}
                    highlight={search}
                  />
                </span>
              </div>

              {/* 좋아요, 수정, 삭제 버튼 */}
              <PostCommentActions
                comment={comment}
                selectedPost={selectedPost}
              />
            </section>
          ))
        )}
      </section>
    </section>
  );
};

const PostDetailDialog: FC = () => {
  const {
    filters: { search },
  } = usePostFilter();
  const { selectedPost, isPostDetailDialogOpen, setIsPostDetailDialogOpen } = usePost();

  return (
    <Dialog
      open={isPostDetailDialogOpen}
      onOpenChange={setIsPostDetailDialogOpen}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText
              text={selectedPost?.title}
              highlight={search}
            />
          </DialogTitle>
        </DialogHeader>

        <section className="space-y-4 overflow-hidden">
          <p>
            <HighlightText
              text={selectedPost?.body}
              highlight={search}
            />
          </p>

          {/* 댓글 */}
          <PostDetailDialogComment
            selectedPost={selectedPost}
            search={search}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
};

PostDetailDialog.displayName = 'PostDetailDialog';
export default PostDetailDialog;
