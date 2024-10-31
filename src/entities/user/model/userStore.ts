import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { User } from './types';

type State = {
  user: User | null;
};
type Action = {
  selectUser: (selectedUser: User) => void;
};

const useUserStoreBase = create<State & Action>()(
  immer((set) => ({
    user: null,
    selectUser: (selectedUser: User) => set(() => ({ user: selectedUser })),
  }))
);

export const useUserStore = createSelectors(useUserStoreBase);
