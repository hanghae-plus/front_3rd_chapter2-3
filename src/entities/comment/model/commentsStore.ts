import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { Comment } from './type';

type State = {
  comments: Record<string, Comment[]>;
};
type Action = {
  addComments: (postId: number, newComments: Comment[]) => void;
};

const useCommentsStoreBase = create<State & Action>()(
  immer((set) => ({
    comments: {},
    addComments: (postId: number, newComments: Comment[]) => set((state) => (state.comments[postId] = newComments)),
  }))
);

export const useCommentsStore = createSelectors(useCommentsStoreBase);
