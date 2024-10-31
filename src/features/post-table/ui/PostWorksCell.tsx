import { Edit2, MessageSquare, Trash2 } from 'lucide-react';

import { fetchAllCommentsByPostId } from '~/entities/comment/api/commentApi';
import { useCommentsStore } from '~/entities/comment/model/commentsStore';
import { deletePost as deletePostApi } from '~/entities/post/api/postApi';
import { usePostStore } from '~/entities/post/model/store';
import { Post } from '~/entities/post/model/types';

import { Button } from '~/shared/ui/Button';

export const PostWorksCell = ({ post }: { post: Post }) => {
  // comments store
  const comments = useCommentsStore.use.comments();
  const addComments = useCommentsStore.use.addComments();

  // post store
  const selectPost = usePostStore.use.selectPost();
  const deletePostAction = usePostStore.use.deletePostAction();

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const { comments } = await fetchAllCommentsByPostId(postId);

      addComments(postId, comments);
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };
  // 게시물 상세 보기
  const openPostDetail = (post?: Post) => {
    if (!post) {
      return;
    }
    selectPost(post);
    fetchComments(post.id);
    // setShowPostDetailDialog(true);
  };

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await deletePostApi(id);
      deletePostAction(id);
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          selectPost(post);
          // setShowEditDialog(true);
        }}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
