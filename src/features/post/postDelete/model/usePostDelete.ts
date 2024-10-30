import { useCallback } from 'react';
import { deletePost as deletePostApi } from '../../../../entities/post/api/postApi';
import { Post } from '../../../../entities/post/model/types';

export const usePostDelete = (post: Post, { onDelete }: { onDelete: (deletedPost: Post) => void }) => {
  const deletePost = useCallback(() => {
    deletePostApi(post.id)
      .then(() => {
        onDelete(post);
      })
      .catch((error) => {
        console.error('게시물 삭제 오류:', error);
      });
  }, [post, onDelete]);

  return {
    deletePost,
  };
};
