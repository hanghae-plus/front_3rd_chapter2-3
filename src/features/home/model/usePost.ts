import { useAtom } from 'jotai';
import { selectedPostAtom, isPostDetailDialogOpenAtom } from '@entities/home/model/postAtoms';

export const usePost = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [isPostDetailDialogOpen, setIsPostDetailDialogOpen] = useAtom(isPostDetailDialogOpenAtom);

  return {
    selectedPost,
    isPostDetailDialogOpen,
    setSelectedPost,
    setIsPostDetailDialogOpen,
  };
};
