import { Edit2 } from 'lucide-react';
import { Post } from '../../../../entities/post/model/types';
import { Button } from '../../../../shared/ui';
import { useShallow } from 'zustand/shallow';
import { usePostStore } from '../../postStore';

type Props = {
  post: Post;
};

export const PostEditButton = ({ post }: Props) => {
  // TODO: useShallow 사용하지 않을 경우 무한 리렌더링 발생
  // Ref: https://github.com/pmndrs/zustand?tab=readme-ov-file#selecting-multiple-state-slices
  const { setSelectedPost, setShowEditDialog } = usePostStore(
    useShallow((state) => ({
      setSelectedPost: state.setSelectedPost,
      setShowEditDialog: state.setShowEditDialog,
    })),
  );

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedPost(post);
        setShowEditDialog(true);
      }}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  );
};
