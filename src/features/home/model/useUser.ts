import { useAtom, useAtomValue } from 'jotai';

import { User } from '@/entities/home/model/types';
import { isPostUserDialogOpenAtom, userAtom } from '@entities/home/model/userAtoms';

export const useUser = () => {
  const user = useAtomValue<User | null>(userAtom);
  const [isPostUserDialogOpen, setIsPostUserDialogOpen] = useAtom<boolean>(isPostUserDialogOpenAtom);

  return { user, isPostUserDialogOpen, setIsPostUserDialogOpen };
};
