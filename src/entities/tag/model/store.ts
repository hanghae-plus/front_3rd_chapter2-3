import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { Post } from './types';

type TagsState = { tags: Tag[] };

type TagsAction = {};

// interface IPostSlice {
//   posts: Post[];
//   addNewPostAction: (post: Post) => void;
//   updatePostAction: (id: number) => void;
//   deletePostAction: () => void;
// }

const initialState: Post[] = [];

const tagSlice: StateCreator<TagsState & TagsAction, [], [['zustand/immer', never]], TagsState & TagsAction> = immer(
  (set) => ({
    tags: initialState,
  })
);

const usePostStoreBase = create<TagsState & TagsAction>()(tagSlice);

export const usePostStore = createSelectors(usePostStoreBase);
