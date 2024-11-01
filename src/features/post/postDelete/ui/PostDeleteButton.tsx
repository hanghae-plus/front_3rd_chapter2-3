import { Post } from '../../../../entities/post/model/types';
import { Button } from '../../../../shared/ui';
import { Trash2 } from 'lucide-react';
import { usePostDelete } from '../model/usePostDelete';
import { useCallback } from 'react';

type Props = {
  post: Post;
  onDelete: (deletedPost: Post) => void;
};

export const PostDeleteButton = ({ post, onDelete }: Props) => {
  const handleDelete = useCallback(
    (deletedPost: Post) => {
      console.log('deletedPost', deletedPost);
      onDelete(deletedPost);
    },
    [onDelete],
  );

  const { deletePost } = usePostDelete(post, {
    onDelete: handleDelete,
  });

  const handleClick = useCallback(() => {
    deletePost();
  }, [deletePost]);

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};
